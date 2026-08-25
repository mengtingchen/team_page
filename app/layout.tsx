import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "淘天集团AI原生多模态生成团队｜技术与业务成果",
    description: "直面消费者的 AIGC 图像与视频生成：淘天集团 AI 原生多模态生成团队的业务场景、商用试穿算法、高效图像模型与实时交互视频研究。",
    openGraph: {
      title: "淘天集团AI原生多模态生成团队",
      description: "直面消费者的 AIGC 图像与视频生成。",
      type: "website",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
