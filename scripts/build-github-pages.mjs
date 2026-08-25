import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputDir = path.resolve(process.argv[2] ?? path.join(root, "tmp/github-pages/ai-native-team"));
const assetsDir = path.join(outputDir, "assets");

const workerUrl = pathToFileURL(path.join(root, "dist/server/index.js"));
workerUrl.searchParams.set("github-pages", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://mengtingchen.github.io/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Render failed with HTTP ${response.status}`);

let html = await response.text();
const stylesheetMatch = html.match(
  /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/i,
);
if (!stylesheetMatch) throw new Error("Could not find the compiled stylesheet in rendered HTML");

const stylesheetPath = path.join(root, "dist/client", stylesheetMatch[1].replace(/^\//, ""));
const stylesheet = await readFile(stylesheetPath, "utf8");
html = html.replace(stylesheetMatch[0], `<style>${stylesheet}</style>`);

const preservedScripts = [];
html = html.replace(/<script\b[^>]*data-scrollspy[^>]*>[\s\S]*?<\/script>/gi, (script) => {
  const marker = `<!-- preserved-scrollspy-${preservedScripts.length} -->`;
  preservedScripts.push(script);
  return marker;
});
html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b(?![^>]*rel=["']icon["'])[^>]*>/gi, "")
  .replace(/<meta\b[^>]*(?:og:image|twitter:image|localhost)[^>]*>/gi, "");
preservedScripts.forEach((script, index) => {
  html = html.replace(`<!-- preserved-scrollspy-${index} -->`, script);
});

const staticMetadata = [
  "<title>淘天集团AI原生多模态生成团队｜技术与业务成果</title>",
  '<meta name="description" content="直面消费者的 AIGC 图像与视频生成：淘天集团 AI 原生多模态生成团队的业务场景、商用试穿算法、高效图像模型与实时交互视频研究。">',
  '<meta property="og:title" content="淘天集团AI原生多模态生成团队">',
  '<meta property="og:description" content="直面消费者的 AIGC 图像与视频生成。">',
  '<meta property="og:type" content="website">',
  '<link rel="icon" href="assets/favicon.svg">',
].join("");
html = html.replace("</head>", `${staticMetadata}</head>`);

const assetReferences = [...html.matchAll(/\/assets\/([^"'\s<>)]+)/g)];
const assetNames = [...new Set(assetReferences.map((match) => decodeURIComponent(match[1])))];

await mkdir(assetsDir, { recursive: true });
for (const assetName of assetNames) {
  await copyFile(path.join(root, "public/assets", assetName), path.join(assetsDir, assetName));
  html = html.split(`/assets/${assetName}`).join(`assets/${assetName}`);
}

await copyFile(path.join(root, "public/favicon.svg"), path.join(assetsDir, "favicon.svg"));
html = html.replace(/href=["']\/favicon\.svg["']/gi, 'href="assets/favicon.svg"');
html = html.replace(
  "</head>",
  '<meta name="generator" content="Codex GitHub Pages build"><!-- github-pages-static-build --></head>',
);

await writeFile(path.join(outputDir, "index.html"), html, "utf8");
console.log(outputDir);
console.log(`${assetNames.length + 1} assets`);
