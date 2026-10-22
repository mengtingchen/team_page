const sections = [
  ["01", "淘宝业务场景", "从技术到消费体验", "business"],
  ["02", "商用试穿算法", "Tstars-Tryon 1.0", "tryon"],
  ["03", "高效图像模型", "训练 · 数据 · 评测", "image-model"],
  ["04", "实时交互视频", "二维生成到交互式 4D", "video"],
  ["05", "团队学术论文", "Publications", "publications"],
];

const scrollSpyScript = `(() => {
  const links = Array.from(document.querySelectorAll('.report-rail nav a[href^="#"]'));
  const entries = links.map((link) => {
    const id = decodeURIComponent(link.hash.slice(1));
    return { link, section: document.getElementById(id) };
  }).filter((entry) => entry.section);
  if (!entries.length) return;

  const activate = (activeLink) => {
    links.forEach((link) => {
      const active = link === activeLink;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  let framePending = false;
  const update = () => {
    framePending = false;
    const activationLine = Math.min(260, window.innerHeight * 0.32);
    let current = entries[0];
    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= activationLine) current = entry;
      else break;
    }
    activate(current.link);
  };
  const requestUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('hashchange', requestUpdate);
  update();
})();`;

const businessHighlights = [
  {
    number: "01",
    title: "规模化全量上线",
    text: "淘宝 App、千问购物助手、千问 App 多场景全量上线，让算法进入真实消费者的日常购物链路。",
  },
  {
    number: "02",
    title: "真实海量消费者",
    text: "累计服务了数千万真实消费者，完成数亿次试穿任务，为海量用户带来了切实的体验提升。",
  },
  {
    number: "03",
    title: "用户一致好评",
    text: "作为淘宝最受欢迎的 AI 应用，获得了来自用户的高度好评和更多的功能期待。",
  },
  {
    number: "04",
    title: "功能持续拓展",
    text: "围绕穿搭导购和助手场景，未来会有更多图像和视频功能上线，是 AIGC toC 落地最具想象力的场景之一。",
  },
];

const heroExpertise = [
  ["01", "图像生成和编辑", "内容与意图"],
  ["02", "实时交互视频", "统一能力"],
  ["03", "C 端商用模型", "高效稳定"],
  ["04", "电商场景落地", "规模化体验"],
];

const tryonAbilities = [
  ["极端场景鲁棒", "覆盖极端姿态、过曝、运动模糊、非常规视角与复杂背景，在真实分布下保持稳定输出。"],
  ["身份结构保持", "稳定保留人物身份、体型、姿态与背景，遵循物理规律，结果自然可信。"],
  ["材质细节保真", "精准还原服饰纹理、材质、结构与复杂叠穿关系，显著减少常见 AI 伪影。"],
  ["近实时商用部署", "5B 主干结合 CFG 蒸馏与步数蒸馏，单件最快 3.92 秒，多件 6.74 秒。"],
];

const modelPapers = [
  {
    number: "03",
    tag: "训练工程",
    title: "Swift-Image",
    subtitle: "统一基模的高效训练与推理",
    image: "/assets/swift-image-architecture.png",
    alt: "Swift-Image统一图像生成模型架构图",
    paperTitle: "Swift-Image: Exploring the Performance Frontier of Compact Unified Image Generation Models",
    paperUrl: "https://arxiv.org/abs/2608.20334v1",
    text: "从渐进预训练、持续预训练到专家并行强化学习与多教师蒸馏，构建统一的图像生成与编辑模型，并通过少步蒸馏面向高效部署。",
    facts: ["统一 6B 图像模型", "训练—强化—蒸馏闭环"],
  },
  {
    number: "04",
    tag: "能力数据",
    title: "Capability-Centric Data",
    subtitle: "以能力为中心的数据设计",
    image: "/assets/capability-centric-data-engine.png",
    alt: "以能力为中心的数据引擎架构图",
    paperTitle: "From Corpora to Co-Evolving Capabilities: Capability-Centric Data Design for Generalist Image Generation",
    paperUrl: "https://arxiv.org/abs/2608.18076v1",
    text: "围绕视觉表达、编辑关联与复杂推理搭建三类数据引擎，让数据建设从规模导向转向能力导向，系统覆盖生成、编辑和知识增强任务。",
    facts: ["文本生图 · 图像编辑 · 知识增强", "能力检索与数据再平衡"],
  },
  {
    number: "05",
    tag: "真实评测",
    title: "CPI-Bench",
    subtitle: "面向真实需求的能力评测",
    image: "/assets/cpi-bench-pipeline.png",
    alt: "CPI-Bench真实场景评测数据构建流程",
    paperTitle: "CPI-Bench: A Comprehensive, Practical and Intelligent Benchmark for Real-World Image Editing",
    paperUrl: "https://arxiv.org/abs/2608.14546v1",
    text: "从通用能力、实用场景与智能推理三个维度构建评测，覆盖真实创作需求与复杂编辑任务，让模型能力能够被系统、可解释地衡量。",
    facts: ["通用 · 实用 · 智能", "多维任务与人类偏好评测"],
  },
];

const videoPapers = [
  {
    venue: "ACM MM 2024",
    title: "Tunnel Try-on",
    subtitle: "首个基于 Diffusion 的视频试衣",
    paperTitle: "Tunnel Try-on: Excavating Spatial-temporal Tunnels for High-quality Virtual Try-on in Videos",
    paperUrl: "https://arxiv.org/abs/2404.17571",
    image: "/assets/tunnel-tryon-architecture.jpg",
    video: "/assets/tunnel-tryon-demo.mp4",
    poster: "/assets/tunnel-tryon-demo-poster.jpg",
    text: "在时空隧道中组织服饰特征，生成高质量、高一致性的视频试衣结果。",
  },
  {
    venue: "ICML 2026",
    title: "iTryOn",
    subtitle: "动作与语义交互",
    paperTitle: "iTryOn: Mastering Interactive Video Virtual Try-On with Spatial-Semantic Guidance",
    paperUrl: "https://arxiv.org/abs/2605.21431",
    image: "/assets/itryon-architecture.jpg",
    video: "/assets/itryon-demo.mp4",
    poster: "/assets/itryon-demo-poster.jpg",
    text: "融合动作引导与语义理解，实现对人物动作与服饰语义的交互式控制。",
  },
  {
    venue: "ECCV 2026",
    title: "TryOnCrafter",
    subtitle: "3D 增强与镜头可控",
    paperTitle: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
    paperUrl: "https://arxiv.org/abs/2606.26092",
    image: "/assets/tryoncrafter-architecture.jpg",
    video: "/assets/tryoncrafter-demo.mp4",
    poster: "/assets/tryoncrafter-demo-poster.jpg",
    text: "引入可渲染的 4D 试衣代理，增强跨视角稳定性并支持镜头轨迹控制。",
  },
  {
    venue: "NeurIPS 2026",
    title: "FashionChameleon",
    subtitle: "流式交互生成",
    paperTitle: "FashionChameleon: Towards Real-Time and Interactive Human-Garment Video Customization",
    paperUrl: "https://arxiv.org/abs/2605.15824",
    image: "/assets/flashfashion-architecture.jpg",
    video: "/assets/flashfashion-demo.mp4",
    poster: "/assets/flashfashion-demo-poster.jpg",
    text: "面向实时交互的流式视频生成框架，让连续、即时的试衣体验成为可能。",
  },
];

const videoGoals = [
  ["01", "优质", "ID 一致性、Motion 合理性与整体美观度"],
  ["02", "泛化", "支持任意用户个人形象与任意服饰 ID"],
  ["03", "鲁棒", "保障每次生成的稳定性与输出质量"],
  ["04", "速度", "降低用户等待时长，持续提升交互体验"],
  ["05", "效率", "降低资源成本，支持大规模业务调用并支持实时生成"],
  ["06", "可交互", "在实时的基础之上为更多交互形式创建基础"],
];

// Status reference: https://mengtingchen.github.io/ (checked 2026-10-22).
// New arXiv releases have no publicly stated conference or review outcome.
const recentPreprints = [
  { year: "2026", venue: "arXiv", date: "2026-10", name: "CommerceGen-Studio", title: "CommerceGen-Studio: An End-to-End Framework for Commercial-Grade Main-Image Generation", url: "https://arxiv.org/abs/2610.20603", summary: "面向商业级电商主图生成的端到端框架。" },
  { year: "2026", venue: "arXiv", date: "2026-10", name: "Representation Guidance", title: "Learning Representations to Guide Pixel Diffusion Transformers", url: "https://arxiv.org/abs/2610.12978", summary: "通过学习表征引导像素空间 Diffusion Transformer。" },
];

const academicPublications = [
  ...recentPreprints,
  { year: "2026", venue: "NeurIPS 2026", title: "What Matters for Diffusion-Friendly Latent Manifold? Prior-Aligned Autoencoders for Latent Diffusion", url: "https://arxiv.org/abs/2605.07915" },
  { year: "2026", venue: "NeurIPS 2026", title: "FashionChameleon: Towards Real-Time and Interactive Human-Garment Video Customization", url: "https://arxiv.org/abs/2605.15824" },
  { year: "2026", venue: "ECCV 2026", title: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:5nxA0vEk-isC" },
  { year: "2026", venue: "NeurIPS 2026", title: "Continuous-Time Distribution Matching for Few-Step Diffusion Distillation", url: "https://arxiv.org/abs/2605.06376" },
  { year: "2026", venue: "REPORT", title: "Tstars-Tryon 1.0: Robust and Realistic Virtual Try-On for Diverse Fashion Items", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:ufrVoPGSRksC" },
  { year: "2026", venue: "ICML 2026", title: "iTryOn: Mastering Interactive Video Virtual Try-On with Spatial-Semantic Guidance", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:UebtZRa9Y70C" },
  { year: "2026", venue: "ICLR 2026", title: "ORION: Decoupling and Alignment for Unified Autoregressive Understanding and Generation", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:_FxGoFyzp5QC" },
  { year: "2026", venue: "REPORT", title: "Swift-Image: Exploring the Performance Frontier of Compact Unified Image Generation Models", url: "https://arxiv.org/abs/2608.20334v1" },
  { year: "2026", venue: "REPORT", title: "From Corpora to Co-Evolving Capabilities: Capability-Centric Data Design for Generalist Image Generation", url: "https://arxiv.org/abs/2608.18076v1" },
  { year: "2026", venue: "REPORT", title: "CPI-Bench: A Comprehensive, Practical and Intelligent Benchmark for Real-World Image Editing", url: "https://arxiv.org/abs/2608.14546v1" },
  { year: "2026", venue: "Under Review", title: "ExpertVerse: A General-Purpose Benchmark for Expert-Level Reasoning in Knowledge-Intensive Visual Synthesis", url: "https://arxiv.org/abs/2607.19341" },
  { year: "2026", venue: "ICIP 2026", title: "DENOISER: Rethinking the Robustness for Open-Vocabulary Action Recognition", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:zYLM7Y9cAGgC" },
  { year: "2026", venue: "ICIP 2026", title: "Squeeze Out Tokens from Sample for Finer-Grained Data Governance", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:eQOLeE2rZwMC" },
  { year: "2026", venue: "ICME 2026", title: "Beyond Static Scenes: Camera-controllable Background Generation for Human Motion", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:YsMSGLbcyi4C" },
  { year: "2026", venue: "CVPR 2026 Workshop", title: "Improving Human Image Animation via Semantic Representation Alignment", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:hqOjcs7Dif8C" },
  { year: "2025", venue: "CVPR 2025", title: "Advancing Myopia to Holism: Fully Contrastive Language-Image Pre-training", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:W7OEmFMy1HYC" },
  { year: "2025", venue: "ICCV 2025", title: "DepthDance: Complex-pose Human Image Animation with Appearance-agnostic Depth Guidance", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:WF5omc3nYNoC" },
  { year: "2024", venue: "NeurIPS 2024", title: "Zero-shot Image Editing with Reference Imitation", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:Y0pCki6q_DkC" },
  { year: "2024", venue: "ECCV 2024", title: "LivePhoto: Real Image Animation with Text-guided Motion Control", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:2osOgNQ5qMEC" },
  { year: "2024", venue: "ECCV 2024", title: "Wear-Any-Way: Manipulable Virtual Try-on via Sparse Correspondence Alignment", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:qjMakFHDy7sC" },
  { year: "2024", venue: "ACM MM 2024", title: "Tunnel Try-on: Excavating Spatial-temporal Tunnels for High-quality Virtual Try-on in Videos", url: "https://scholar.google.com.hk/citations?view_op=view_citation&hl=zh-CN&user=LcoK9ZEAAAAJ&citation_for_view=LcoK9ZEAAAAJ:Tyk-4Ss8FVUC" },
];

const neurips2026Papers = academicPublications.filter((paper) => paper.venue === "NeurIPS 2026");

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="section-title">
      <b>{number}</b>
      <div><h2>{title}</h2><p>{subtitle}</p></div>
      <span>AI NATIVE / MULTIMODAL GENERATION</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="report-shell" id="top">
      <aside className="report-rail" aria-label="报告目录">
        <nav>
          {sections.map(([number, title, , anchor], index) => (
            <a className={index === 0 ? "is-active" : undefined} aria-current={index === 0 ? "location" : undefined} href={`#${anchor}`} key={number}>
              <b>{number}</b><span>{title}</span>
            </a>
          ))}
        </nav>
        <small>TECHNICAL<br />HOMEPAGE</small>
      </aside>

      <div className="report-page">
        <header className="report-header">
          <div className="header-brand"><strong>淘天集团 · AI原生</strong><span>多模态生成团队</span></div>
          <nav aria-label="页面导航">
            {sections.map(([number, title, , anchor]) => <a key={number} href={`#${anchor}`}>{number}　{title}</a>)}
          </nav>
        </header>

        <section className="report-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">AI NATIVE MULTIMODAL GENERATION</p>
            <h1 id="hero-title">直面消费者的<br /><em>AIGC 图像与视频生成</em></h1>
            <i className="orange-rule" />
            <p className="team-name">淘天集团AI原生多模态生成团队</p>
            <p className="hero-intro">我们是淘天集团 AI 原生多模态生成团队，专注多模态内容理解与生成，以领先算法重塑用户体验、驱动产品创新，赋能 AI 试衣、时尚创意内容与商品智能素材等电商场景。持续攻坚生成算法基础问题，打造高效稳定的 C 端商用级生成模型。</p>
            <div className="hero-expertise">
              {heroExpertise.map(([number, title, note]) => (
                <article key={number}><span>{number}</span><div><b>{title}</b><small>{note}</small></div></article>
              ))}
            </div>
            <div className="hero-promise">
              <span>RESEARCH → PRODUCT → IMPACT</span>
              <strong>从生成基础问题，走向真实消费体验</strong>
            </div>
          </div>
          <figure className="hero-figure">
            <img src="/assets/tryon-grid-2x4.png" alt="AI试衣八位真实用户的两行四列效果展示" />
          </figure>
        </section>

        <a className="research-announcement" href="#publications">
          <span>RESEARCH UPDATE · 2026.10</span>
          <strong>3 篇论文获 NeurIPS 2026 录用 · 2 篇最新预印本</strong>
          <b>查看研究进展 ↗</b>
        </a>

        <section className="report-section business" id="business">
          <SectionTitle number="01" title="淘宝业务场景" subtitle="从技术到消费体验" />
          <div className="business-grid">
            <figure className="report-video portrait-video">
              <video controls playsInline preload="metadata" poster="/assets/taobao-ai-tryon-full-poster.jpg">
                <source src="/assets/taobao-ai-tryon-full.mp4" type="video/mp4" />
              </video>
              <figcaption><b>淘宝AI试穿 谁都能试</b></figcaption>
            </figure>
            <figure className="report-video four-three-video">
              <video controls playsInline preload="metadata" poster="/assets/nana-shopping-assistant-ad-poster.jpg">
                <source src="/assets/nana-shopping-assistant-ad-000-015.mp4" type="video/mp4" />
              </video>
              <figcaption><b>上淘宝AI购物 万千穿搭秒上身</b></figcaption>
            </figure>
            <figure className="report-video landscape-video">
              <video controls playsInline preload="metadata" poster="/assets/shopping-assistant-launch-poster.jpg">
                <source src="/assets/shopping-assistant-launch-149-214.mp4" type="video/mp4" />
              </video>
              <figcaption><b>用AI试穿陪你一起发现更多可能</b></figcaption>
            </figure>
          </div>
          <div className="business-highlights">
            {businessHighlights.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
          <div className="business-cta" role="note">
            <span>立即体验</span>
            <p>打开手机淘宝，搜索 <strong>AI试穿</strong> 即可体验</p>
          </div>
        </section>

        <section className="report-section tryon" id="tryon">
          <SectionTitle number="02" title="商用试穿算法" subtitle="Tstars-Tryon 1.0" />
          <div className="tryon-intro">
            <div className="tryon-overview">
              <small>COMMERCIAL-SCALE VIRTUAL TRY-ON</small>
              <h3>面向真实消费场景的全栈商用试穿系统</h3>
              <p>Tstars-Tryon 1.0 是淘宝 AI 试穿的算法内核。团队将虚拟试穿重构为统一的多图图像编辑任务，围绕数据治理、MMDiT 模型架构、渐进式训练与 RL 精调、Prompt 增强、CFG 与步数蒸馏完成全栈优化，在鲁棒性、真实感、组合灵活性和生成效率之间取得商用级突破。</p>
            </div>
            <article className="tryon-paper">
              <span>PAPER · 2026</span>
              <a href="https://arxiv.org/abs/2604.19748" target="_blank" rel="noreferrer">
                <strong>Tstars-Tryon 1.0: Robust and Realistic Virtual Try-On for Diverse Fashion Items</strong>
                <em>阅读论文 ↗</em>
              </a>
              <a className="article-link" href="https://mp.weixin.qq.com/s/9xsNpPF5bKI3L5V1cRvB_w" target="_blank" rel="noreferrer">查看中文技术解读 ↗</a>
            </article>
          </div>
          <div className="tryon-kpis" aria-label="Tstars-Tryon 1.0 核心指标">
            <span><b>5B</b>精简主干 DiT</span>
            <span><b>3.92s</b>最快单件生成</span>
            <span><b>6.74s</b>多件试穿生成</span>
            <span><b>1—6 件</b>自由组合试穿</span>
            <span><b>8 类</b>服饰与配饰</span>
          </div>
          <div className="tryon-feature-grid">
            <article className="tryon-feature-card">
              <header><span>01</span><h3>Robust and Realistic Virtual Try-on in the Wild</h3></header>
              <figure><img src="/assets/tryon-wild-showcase.jpg" alt="真实场景下鲁棒且自然的虚拟试穿效果" /></figure>
              <p>面向真实消费环境，在复杂人物、服饰与背景分布下稳定保持身份一致、服饰保真与自然质感。</p>
            </article>
            <article className="tryon-feature-card">
              <header><span>02</span><h3>Supports Multiple Challenging, Extreme and Complex Scenarios Virtual Try-on</h3></header>
              <figure><img src="/assets/tryon-challenging-showcase-optimized.jpg" alt="复杂与极端场景下的虚拟试穿效果" /></figure>
              <p>覆盖复杂光照、极端姿态、多人、宠物、特殊场景与非典型主体等长尾试穿需求。</p>
            </article>
            <article className="tryon-feature-card">
              <header><span>03</span><h3>GSB 评测获得业界 SOTA 水平</h3></header>
              <figure><img src="/assets/tryon-gsb-sota.jpg" alt="Tstars-Tryon与业界模型的GSB评测结果" /></figure>
              <p>在人类偏好 GSB 评测中全面领先 Nano Banana Pro、Seedream 5 Lite 与 GPT Image 2，达到业界 SOTA 水平。</p>
            </article>
          </div>
          <div className="tryon-layout">
            <div className="ability-column">
              {tryonAbilities.slice(0, 2).map(([title, text], index) => (
                <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <div className="system-board">
              <p className="panel-label">端到端多模态试穿生成流程</p>
              <div className="pipeline">
                <div className="pipeline-input"><span>人物图像</span><span>服饰图像</span><span>文本描述</span></div>
                <i>→</i>
                <div className="pipeline-model"><small>统一多图编辑模型</small><strong>Tstar Tryon Model</strong><div><b>数据引擎</b><b>渐进式训练</b><b>RL + 蒸馏</b></div></div>
                <i>→</i>
                <div className="pipeline-output"><span>身份一致</span><span>服饰保真</span><span>真实自然</span></div>
              </div>
              <figure className="tryon-results">
                <img src="/assets/tryon-benchmark-distribution.jpg" alt="覆盖性别、姿态与真实场景广泛分布的试穿评测集" />
                <figcaption><strong>真实场景 · 分布广泛的评测集</strong><span>覆盖不同性别、复杂姿态与多样化真实环境，系统验证模型在长尾消费场景中的泛化能力。</span></figcaption>
              </figure>
              <div className="tryon-sota"><span>INDUSTRY SOTA</span><p>在真实场景、分布广泛的评测集上取得业界 SOTA，综合效果超越 <strong>Nano Banana Pro</strong> 与 <strong>GPT Image 2</strong>。</p></div>
            </div>
            <div className="ability-column right">
              {tryonAbilities.slice(2).map(([title, text], index) => (
                <article key={title}><span>0{index + 3}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="report-section image-model" id="image-model">
          <SectionTitle number="03" title="高效图像模型" subtitle="训练 · 数据 · 评测" />
          <p className="section-lead">从高效的模型设计、训练范式、大规模数据链路到泛化评测方案，形成“数据—模型—训练—评测”为一体的迭代闭环。</p>
          <div className="model-showcase">
            <figure>
              <header><span>01</span><div><small>TEXT TO IMAGE</small><h3>T2I 图像生成</h3></div></header>
              <img src="/assets/t2i-capability-showcase.jpg" alt="T2I文本生成图像多场景效果展示" />
              <figcaption>覆盖中文排版、商业海报、产品视觉、人物与自然场景的高质量生成能力</figcaption>
            </figure>
            <figure>
              <header><span>02</span><div><small>IMAGE EDITING</small><h3>Edit 图像编辑</h3></div></header>
              <img src="/assets/edit-capability-showcase.jpg" alt="图像编辑与商业内容创作效果展示" />
              <figcaption>覆盖人物组合、内容创作、商品广告、风格转换与过程编辑的通用能力</figcaption>
            </figure>
          </div>
          <div className="paper-grid">
            {modelPapers.map((paper) => (
              <article className="paper-card" key={paper.title}>
                <header><span>{paper.number}</span><div><small>{paper.tag}</small><h3>{paper.title}</h3><p>{paper.subtitle}</p></div></header>
                <figure><img src={paper.image} alt={paper.alt} /></figure>
                <p className="paper-summary">{paper.text}</p>
                <a className="paper-publication" href={paper.paperUrl} target="_blank" rel="noreferrer">
                  <small>PAPER · ARXIV</small>
                  <strong>{paper.paperTitle}</strong>
                  <span>阅读论文 ↗</span>
                </a>
                <footer>{paper.facts.map((fact) => <span key={fact}>{fact}</span>)}</footer>
              </article>
            ))}
          </div>
        </section>

        <section className="report-section video-research" id="video">
          <SectionTitle number="04" title="实时交互视频" subtitle="二维生成到交互式 4D" />
          <div className="video-goals">
            {videoGoals.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="video-paper-grid">
            {videoPapers.map((paper, index) => (
              <article key={paper.title}>
                <header><span>0{index + 1}</span><div><small>{paper.venue}</small><h3>{paper.title}</h3><p>{paper.subtitle}</p></div></header>
                <div className="video-paper-media">
                  <figure><img src={paper.image} alt={`${paper.title}方法与效果图`} /></figure>
                  <video className="video-paper-demo" controls playsInline preload="metadata" poster={paper.poster} aria-label={`${paper.title}视频演示`}>
                    <source src={paper.video} type="video/mp4" />
                  </video>
                </div>
                <p className="video-paper-summary">{paper.text}</p>
                <a className="video-paper-publication" href={paper.paperUrl} target="_blank" rel="noreferrer">
                  <small>{paper.venue}</small>
                  <strong>{paper.paperTitle}</strong>
                  <span>阅读论文 ↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="report-section publications" id="publications">
          <SectionTitle number="05" title="团队学术论文" subtitle="Publications" />
          <div className="research-updates">
            <article className="research-acceptance">
              <small>2026.09 · ACCEPTED</small>
              <h3><b>{neurips2026Papers.length}</b> 篇论文录用 NeurIPS 2026</h3>
              <p>从潜空间表征、实时交互视频到少步扩散蒸馏。</p>
              <ul>
                {neurips2026Papers.map((paper, index) => (
                  <li key={paper.title}><a href={paper.url} target="_blank" rel="noreferrer">{["PAE", "FashionChameleon", "CDM"][index]} ↗</a></li>
                ))}
              </ul>
            </article>
            {recentPreprints.map((paper) => (
              <article key={paper.url}>
                <small><time dateTime={paper.date}>2026.10</time> · PREPRINT</small>
                <h3><a href={paper.url} target="_blank" rel="noreferrer">{paper.name} ↗</a></h3>
                <p>{paper.summary}</p>
                <a className="research-paper-link" href={paper.url} target="_blank" rel="noreferrer">阅读论文 ↗</a>
              </article>
            ))}
          </div>
          <p className="publication-note">更新于 <time dateTime="2026-10-22">2026.10.22</time> · 论文信息参考 <a href="https://mengtingchen.github.io/" target="_blank" rel="noreferrer">Mengting Chen 个人主页 ↗</a>。新论文按公开信息标注为预印本。</p>
          <ol className="publication-list">
            {academicPublications.map((paper) => (
              <li key={paper.title} className={paper.venue === "NeurIPS 2026" ? "publication-accepted" : undefined}>
                <time>{paper.year}</time>
                <a href={paper.url} target="_blank" rel="noreferrer">{paper.title}</a>
                {paper.venue && <span>{paper.venue}</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className="recruitment" id="recruitment" aria-labelledby="recruitment-title">
          <div className="recruitment-heading"><small>JOIN US · 加入我们</small><h2 id="recruitment-title">与我们一起，<br />打造下一代电商 AI</h2></div>
          <p>我们热忱欢迎对多模态生成技术充满热情、富有探索精神的同学加入我们，一起打造下一代电商 AI 创新业态！</p>
          <a href="mailto:cmt271286@taobao.com"><span>实习 · 校招 · 社招</span><strong>cmt271286@taobao.com</strong><b>投递简历 ↗</b></a>
        </section>

        <footer className="report-footer">
          <strong>淘</strong><span>淘天集团AI原生多模态生成团队</span><small>直面消费者的 AIGC 图像与视频生成</small>
        </footer>
      </div>
      <script data-scrollspy="true" dangerouslySetInnerHTML={{ __html: scrollSpyScript }} />
    </main>
  );
}
