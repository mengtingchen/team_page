import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Chinese technical homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>淘天集团AI原生多模态生成团队｜技术与业务成果<\/title>/i);
  assert.match(html, /淘天集团 · AI原生/);
  assert.match(html, /直面消费者的/);
  assert.match(html, /图像生成和编辑/);
  assert.match(html, /实时交互视频/);
  assert.match(html, /从生成基础问题，走向真实消费体验/);
  assert.match(html, /淘宝业务场景/);
  assert.match(html, /规模化全量上线/);
  assert.match(html, /淘宝 App、千问购物助手、千问 App 多场景全量上线/);
  assert.match(html, /真实海量消费者/);
  assert.match(html, /累计服务了数千万真实消费者，完成数亿次试穿任务/);
  assert.match(html, /用户一致好评/);
  assert.match(html, /作为淘宝最受欢迎的 AI 应用，获得了来自用户的高度好评和更多的功能期待/);
  assert.match(html, /功能持续拓展/);
  assert.match(html, /围绕穿搭导购和助手场景，未来会有更多图像和视频功能上线，是 AIGC toC 落地最具想象力的场景之一/);
  assert.match(html, /打开手机淘宝，搜索/);
  assert.match(html, /AI试穿/);
  assert.match(html, /即可体验/);
  assert.match(html, /商用试穿算法/);
  assert.match(html, /高效图像模型/);
  assert.match(html, /从高效的模型设计、训练范式、大规模数据链路到泛化评测方案/);
  assert.match(html, /“数据—模型—训练—评测”为一体的迭代闭环/);
  assert.doesNotMatch(html, /“训练—数据—评测”的完整闭环/);
  assert.match(html, /实时交互视频/);
  assert.doesNotMatch(html, /高保真.*可交互.*可控镜头.*实时生成/);
  assert.match(html, /团队学术论文/);
  assert.ok((html.match(/href="#publications"/g) ?? []).length >= 2, "顶部导航与左侧索引均应包含 05 团队学术论文");
  assert.doesNotMatch(html, /Diversity Transfer Network for Few-shot Learning/);
  assert.doesNotMatch(html, /Structured Random Forest for Label Distribution Learning/);
  assert.doesNotMatch(html, /Learning to Focus: Cascaded Feature Matching Network for Few-shot Image Recognition/);
  assert.match(html, /Zero-shot Image Editing with Reference Imitation/);
  assert.match(html, /FashionChameleon: Towards Real-Time and Interactive Human-Garment Video Customization/);
  assert.match(html, /ExpertVerse: A General-Purpose Benchmark for Expert-Level Reasoning in Knowledge-Intensive Visual Synthesis/);
  assert.match(html, /ICML 2026/);
  assert.match(html, /NeurIPS 2026 \[UR\]/);
  assert.match(html, /AAAI 2027 \[UR\]/);
  assert.match(html, /REPORT/);
  assert.match(html, /与我们一起，<br\s*\/?>(?:<!-- -->)?打造下一代电商 AI/);
  assert.match(html, /我们热忱欢迎对多模态生成技术充满热情、富有探索精神的同学加入我们/);
  assert.match(html, /mailto:cmt271286@taobao\.com/);
  assert.match(html, /实习 · 校招 · 社招/);
  assert.match(html, /ID 一致性、Motion 合理性与整体美观度/);
  assert.match(html, /支持任意用户个人形象与任意服饰 ID/);
  assert.match(html, /保障每次生成的稳定性与输出质量/);
  assert.match(html, /降低用户等待时长，持续提升交互体验/);
  assert.match(html, /降低资源成本，支持大规模业务调用/);
  assert.match(html, /Tstars-Tryon 1\.0/);
  assert.match(html, /面向真实消费场景的全栈商用试穿系统/);
  assert.match(html, /MMDiT 模型架构/);
  assert.match(html, /Tstar Tryon Model/);
  assert.match(html, /真实自然/);
  assert.doesNotMatch(html, /姿态 \/ 解析/);
  assert.match(html, /真实场景、分布广泛的评测集上取得业界 SOTA/);
  assert.match(html, /Nano Banana Pro/);
  assert.match(html, /GPT Image 2/);
  assert.doesNotMatch(html, /完整视频 · 原始 9:16 比例|00:00–00:15 精选片段|02:29–03:34 精选片段/);
  assert.doesNotMatch(html, /多参考图/);
  assert.match(html, /3\.92s/);
  assert.match(html, /6\.74s/);
  assert.match(html, /Tstars-Tryon 1\.0: Robust and Realistic Virtual Try-On for Diverse Fashion Items/);
  assert.match(html, /https:\/\/arxiv\.org\/abs\/2604\.19748/);
  assert.match(html, /https:\/\/mp\.weixin\.qq\.com\/s\/9xsNpPF5bKI3L5V1cRvB_w/);
  assert.doesNotMatch(html, /拍立淘|报告编号|下载报告|2026 校园招聘/);
  assert.doesNotMatch(html, /hero-number|核心方向|hero-index/);
});

test("ships the research figures and playable local videos", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /\["01", "图像生成和编辑", "内容与意图"\]/);
  assert.match(page, /\["02", "实时交互视频", "统一能力"\]/);
  assert.doesNotMatch(page, /\["01", "多模态理解"/);
  assert.match(page, /<h3>T2I 图像生成<\/h3>/);
  assert.doesNotMatch(page, /T2I 文本生成图像/);
  assert.match(page, /\["05", "效率", "降低资源成本，支持大规模业务调用并支持实时生成"\]/);
  assert.match(page, /\["06", "可交互", "在实时的基础之上为更多交互形式创建基础"\]/);
  assert.match(css, /\.video-goals \{[^}]*grid-template-columns: repeat\(6, 1fr\)/);
  assert.match(page, /在鲁棒性、真实感、组合灵活性和生成效率之间取得商用级突破/);
  assert.doesNotMatch(page, /取得商用级平衡/);
  assert.ok(
    page.indexOf("DENOISER: Rethinking the Robustness") > page.indexOf("ExpertVerse: A General-Purpose Benchmark"),
    "ICIP 论文应在同年份列表中靠后展示",
  );
  assert.ok(
    page.indexOf("Beyond Static Scenes: Camera-controllable Background Generation") > page.indexOf("ExpertVerse: A General-Purpose Benchmark"),
    "ICME 论文应在同年份列表中靠后展示",
  );
  assert.ok(
    page.indexOf("Improving Human Image Animation via Semantic Representation Alignment") > page.indexOf("Beyond Static Scenes: Camera-controllable Background Generation"),
    "Workshop 论文应在同年份列表末尾展示",
  );
  assert.match(page, /swift-image-architecture\.png/);
  assert.match(page, /t2i-capability-showcase\.jpg/);
  assert.match(page, /edit-capability-showcase\.jpg/);
  assert.ok(
    page.indexOf("t2i-capability-showcase.jpg") < page.indexOf('className="paper-grid"'),
    "T2I 能力图应位于三篇论文卡片之前",
  );
  assert.ok(
    page.indexOf("edit-capability-showcase.jpg") < page.indexOf('className="paper-grid"'),
    "Edit 能力图应位于三篇论文卡片之前",
  );
  assert.match(page, /tryon-grid-2x4\.png/);
  assert.doesNotMatch(page, /shopping-assistant-tryon-poster-left\.png/);
  assert.match(page, /capability-centric-data-engine\.png/);
  assert.match(page, /cpi-bench-pipeline\.png/);
  assert.match(page, /Swift-Image: Exploring the Performance Frontier of Compact Unified Image Generation Models/);
  assert.match(page, /number: "03",\s+tag: "训练工程"/);
  assert.match(page, /number: "04",\s+tag: "能力数据"/);
  assert.match(page, /number: "05",\s+tag: "真实评测"/);
  assert.match(page, /From Corpora to Co-Evolving Capabilities: Capability-Centric Data Design for Generalist Image Generation/);
  assert.match(page, /CPI-Bench: A Comprehensive, Practical and Intelligent Benchmark for Real-World Image Editing/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2608\.20334v1/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2608\.18076v1/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2608\.14546v1/);
  assert.match(page, /shopping-assistant-launch-149-214\.mp4/);
  assert.match(page, /shopping-assistant-launch-poster\.jpg/);
  assert.match(page, /nana-shopping-assistant-ad-000-015\.mp4/);
  assert.match(page, /nana-shopping-assistant-ad-poster\.jpg/);
  assert.match(page, /taobao-ai-tryon-full\.mp4/);
  assert.match(page, /taobao-ai-tryon-full-poster\.jpg/);
  assert.match(page, /tryon-wild-showcase\.jpg/);
  assert.match(page, /tryon-challenging-showcase\.jpg/);
  assert.match(page, /tryon-gsb-sota\.jpg/);
  assert.match(page, /Robust and Realistic Virtual Try-on in the Wild/);
  assert.match(page, /Supports Multiple Challenging, Extreme and Complex Scenarios Virtual Try-on/);
  assert.match(page, /GSB 评测获得业界 SOTA 水平/);
  assert.match(page, /tryon-benchmark-distribution\.jpg/);
  assert.ok(
    page.indexOf("tryon-wild-showcase.jpg") < page.indexOf("tryon-layout"),
    "三张能力卡片应位于 02 算法结构内容之前",
  );
  assert.ok(
    page.indexOf('className="tryon-intro"') < page.indexOf('className="tryon-feature-grid"'),
    "系统介绍应位于三张能力卡片之前",
  );
  assert.ok(
    page.indexOf('className="tryon-kpis"') < page.indexOf('className="tryon-feature-grid"'),
    "核心指标应位于三张能力卡片之前",
  );
  assert.match(page, /淘宝AI试穿 谁都能试/);
  assert.match(page, /上淘宝AI购物 万千穿搭秒上身/);
  assert.match(page, /用AI试穿陪你一起发现更多可能/);
  assert.ok(
    page.indexOf("taobao-ai-tryon-full.mp4") < page.indexOf("nana-shopping-assistant-ad-000-015.mp4"),
    "AI 试衣视频应位于硬广视频之前",
  );
  assert.ok(
    page.indexOf("nana-shopping-assistant-ad-000-015.mp4") < page.indexOf("shopping-assistant-launch-149-214.mp4"),
    "硬广视频应位于发布会视频之前",
  );
  assert.match(page, /Tunnel Try-on/);
  assert.match(page, /iTryOn/);
  assert.match(page, /TryOnCrafter/);
  assert.match(page, /title: "FashionChameleon"/);
  assert.doesNotMatch(page, /title: "FlashFashion"/);
  assert.match(page, /className="video-paper-media"/);
  assert.match(page, /Tunnel Try-on: Excavating Spatial-temporal Tunnels for High-quality Virtual Try-on in Videos/);
  assert.match(page, /iTryOn: Mastering Interactive Video Virtual Try-On with Spatial-Semantic Guidance/);
  assert.match(page, /TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy/);
  assert.match(page, /FashionChameleon: Towards Real-Time and Interactive Human-Garment Video Customization/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2404\.17571/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2605\.21431/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2606\.26092/);
  assert.match(page, /https:\/\/arxiv\.org\/abs\/2605\.15824/);
  assert.match(page, /tunnel-tryon-architecture\.jpg/);
  assert.match(page, /itryon-architecture\.jpg/);
  assert.match(page, /tryoncrafter-architecture\.jpg/);
  assert.match(page, /flashfashion-architecture\.jpg/);
  assert.match(page, /tunnel-tryon-demo\.mp4/);
  assert.match(page, /itryon-demo\.mp4/);
  assert.match(page, /tryoncrafter-demo\.mp4/);
  assert.match(page, /flashfashion-demo\.mp4/);
  assert.match(page, /tunnel-tryon-demo-poster\.jpg/);
  assert.match(page, /itryon-demo-poster\.jpg/);
  assert.match(page, /tryoncrafter-demo-poster\.jpg/);
  assert.match(page, /flashfashion-demo-poster\.jpg/);
  assert.match(css, /object-fit:\s*contain/);
  assert.match(css, /body \{[^}]*font-size:\s*14px/s);
  assert.match(css, /\.model-showcase \{[^}]*align-items:\s*stretch/s);
  assert.match(css, /\.model-showcase figure \{[^}]*display:\s*flex/s);
  assert.match(css, /\.model-showcase img \{[^}]*height:\s*clamp\(440px, 44vw, 660px\)/s);
  assert.match(css, /@media \(max-width:\s*900px\)[\s\S]{0,500}\.business-grid \{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /\.business-highlights p \{[^}]*font-size:\s*12px/s);
  assert.match(css, /\.video-paper-summary \{[^}]*font-size:\s*11\.5px/s);
  assert.equal((page.match(/<video/g) ?? []).length, 4);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);

  await Promise.all([
    access(new URL("../public/assets/swift-image-architecture.png", import.meta.url)),
    access(new URL("../public/assets/t2i-capability-showcase.jpg", import.meta.url)),
    access(new URL("../public/assets/edit-capability-showcase.jpg", import.meta.url)),
    access(new URL("../public/assets/tryon-grid-2x4.png", import.meta.url)),
    access(new URL("../public/assets/capability-centric-data-engine.png", import.meta.url)),
    access(new URL("../public/assets/cpi-bench-pipeline.png", import.meta.url)),
    access(new URL("../public/assets/shopping-assistant-launch-149-214.mp4", import.meta.url)),
    access(new URL("../public/assets/shopping-assistant-launch-poster.jpg", import.meta.url)),
    access(new URL("../public/assets/nana-shopping-assistant-ad-000-015.mp4", import.meta.url)),
    access(new URL("../public/assets/nana-shopping-assistant-ad-poster.jpg", import.meta.url)),
    access(new URL("../public/assets/taobao-ai-tryon-full.mp4", import.meta.url)),
    access(new URL("../public/assets/taobao-ai-tryon-full-poster.jpg", import.meta.url)),
    access(new URL("../public/assets/tryon-wild-showcase.jpg", import.meta.url)),
    access(new URL("../public/assets/tryon-challenging-showcase.jpg", import.meta.url)),
    access(new URL("../public/assets/tryon-gsb-sota.jpg", import.meta.url)),
    access(new URL("../public/assets/tryon-benchmark-distribution.jpg", import.meta.url)),
    access(new URL("../public/assets/tunnel-tryon-architecture.jpg", import.meta.url)),
    access(new URL("../public/assets/itryon-architecture.jpg", import.meta.url)),
    access(new URL("../public/assets/tryoncrafter-architecture.jpg", import.meta.url)),
    access(new URL("../public/assets/flashfashion-architecture.jpg", import.meta.url)),
    access(new URL("../public/assets/tunnel-tryon-demo.mp4", import.meta.url)),
    access(new URL("../public/assets/itryon-demo.mp4", import.meta.url)),
    access(new URL("../public/assets/tryoncrafter-demo.mp4", import.meta.url)),
    access(new URL("../public/assets/flashfashion-demo.mp4", import.meta.url)),
    access(new URL("../public/assets/tunnel-tryon-demo-poster.jpg", import.meta.url)),
    access(new URL("../public/assets/itryon-demo-poster.jpg", import.meta.url)),
    access(new URL("../public/assets/tryoncrafter-demo-poster.jpg", import.meta.url)),
    access(new URL("../public/assets/flashfashion-demo-poster.jpg", import.meta.url)),
  ]);
});
