/* LicoUp: the site is the client. Every control here does what it says. */
(() => {
  "use strict";
  const SITE = "";
  document.documentElement.classList.add("client");
  const DMG = "https://github.com/LicoLand/LicoUp/releases/download/v0.1.2/LicoUp-macos-arm64.dmg", RELEASE = "https://github.com/LicoLand/LicoUp/releases/tag/v0.1.2";
  const T = {
    en: { search: "Search", get: "Download for macOS", lang: "中文", box: "Message ", today_: "Today", lico: "Lico", crew: "Launch crew", today: "Features", roadmap: "Roadmap", guides: "Guides", agents: "Agents",
      nLico: "LicoUp's resident agent", nCrew: "Concept preview · 3 people, 2 agents", nToday: "Available today", nRoadmap: "Where we're heading", nGuides: "Guides are in English", nAgents: "13 built-in adapters",
      hero: "People. Agents. One conversation.", heroSub: "An open-source messenger where people and AI agents share context, pass work along and deliver results where they belong. You stay in control.",
      lico1: "Hi! I'm Lico. Ask me anything about LicoUp.", lico3: "Today: 13 local agents on Macs with Apple silicon. Messaging with people is on the roadmap.",
      qWhat: "What is LicoUp?", qAgents: "Which agents?", qPeople: "Can I message people?", qOffline: "Is it offline?", qGet: "Download",
      aWhat: "An open-source, local-first Human-Agent Collaboration Client. It starts with conversations with the AI agents on your Mac and is growing into a messenger for people and agents.", aAgents: "13 built-in adapters, including Claude Code, Codex, Cursor, GitHub Copilot and OpenCode. Install and set up each agent first; its version and interface decide what works.", aPeople: "Not yet. Today's release focuses on local agents. Messaging with people, shared results and multi-device history are on the roadmap.", aOffline: "Not quite. Your conversations stay on your device, but an agent you pick may use an online model, which sees what you send it.", aElse: "I can tell you what LicoUp is, which agents it works with, and how to get it.",
      askGet: "Download LicoUp v0.1.2 for Macs with Apple silicon?", yesGet: "Download", noGet: "Not now", okGet: "Download started", aGot: "The release page has the DMG and verification files.", lRelease: "See the release", aLater: "No rush. It's free and open source whenever you're ready.", lCompat: "Check compatibility",
      mia1: "Can we get release notes out today?", cMention: "@Claude Code draft them from this week's changes.", askRead: "Claude Code wants to read this week's changes", allow: "Allow", deny: "Deny", allowed: "Allowed once", denied: "Denied", ccNo: "Understood. I won't read them.", ccBlind: "I can't see this week's changes. Turn them on under Visible to agents.",
      docTitle: "Release notes · v2.4", d1: "Search is twice as fast", d2: "Dark mode on mobile", d3: "12 bug fixes", edit: "Edit", done: "Done", share: "Share", leo1: "Looks great. Ship it!", shareTo: "Share to", send: "Send", shared: "Shared to ", and: " and ", cx1: "Review done. Nothing blocking.", mia2: "Sounds good!", leo2: "See you at 3.",
      members: "Members", you: "You", me: "Me", visible: "Visible to agents", ctx1: "This week's changes", ctx2: "Customer list", about: "About",
      f1: "Bring in the right agent. @mention Claude Code, Codex or any connected agent. It joins with the context you choose.", f2: "Stay in control. Choose what each agent can see. Sensitive actions wait for your approval.", f3: "Pick up where you left off. Conversations live on your device, so goals and decisions stay in view.", tryCrew: "Try it in Launch crew",
      r1: "Now: local agents on your Mac. 13 built-in adapters, explicit approvals and conversations that last.", r2: "Next: people and shared results. Message people alongside agents, and send results to the conversations that need them.", r3: "Later: every device, an open network. Multi-device history and federation over the Lico Arc Protocol, with your endpoint in charge.",
      g1: "What is agent collaboration?", g2: "Everyday use cases", g3: "Coding-agent interfaces, compared", g4: "Orchestration vs. collaboration", g5: "The product", g6: "Privacy & security", g7: "Local-first architecture", g8: "Compatibility",
      fact1: "Free and open source under AGPL-3.0-or-later.", fact2: "v0.1.2 for Macs with Apple silicon.", fact3: "Conversations live on your device.", back: "Conversations", info: "Details", github: "GitHub" },
    zh: { search: "搜索", get: "下载 macOS 版", lang: "EN", box: "发消息给 ", today_: "今天", lico: "Lico", crew: "发布小队", today: "功能", roadmap: "路线图", guides: "指南", agents: "智能体",
      nLico: "LicoUp 的常驻智能体", nCrew: "概念预览 · 3 位成员，2 个智能体", nToday: "现已可用", nRoadmap: "我们的方向", nGuides: "指南目前为英文", nAgents: "内置 13 种适配器",
      hero: "人与智能体，同频对话。", heroSub: "开源的人机协同通讯软件。人与 AI 智能体共享上下文、接力协作，把成果送到该去的地方。每一步，都由你掌控。",
      lico1: "你好呀！我是 Lico，关于 LicoUp 的事都可以问我。", lico3: "当前：Apple 芯片 Mac 上的 13 种本地智能体。与真人的通讯功能在路线图中。",
      qWhat: "LicoUp 是什么？", qAgents: "支持哪些智能体？", qPeople: "能和其他人聊天吗？", qOffline: "是完全离线吗？", qGet: "下载",
      aWhat: "开源、本地优先的人与智能体协作客户端。它从你 Mac 上的 AI 智能体对话起步，正在成长为人与智能体共同使用的通讯软件。", aAgents: "内置 13 种适配器，包括 Claude Code、Codex、Cursor、GitHub Copilot 和 OpenCode。每个智能体需先自行安装配置，具体可用功能取决于其版本和接口。", aPeople: "还不能。当前版本专注于本地智能体，与真人通讯、成果分享和多设备历史都在路线图中。", aOffline: "不完全是。对话保存在你的设备上，但你选择的智能体可能调用在线模型，模型服务能看到发给它的内容。", aElse: "我可以告诉你 LicoUp 是什么、支持哪些智能体，以及怎么下载。",
      askGet: "下载 LicoUp v0.1.2（适用于 Apple 芯片 Mac）？", yesGet: "下载", noGet: "先不用", okGet: "已开始下载", aGot: "发布页提供 DMG 与校验文件。", lRelease: "查看发布页", aLater: "不着急，它免费开源，随时可以下载。", lCompat: "查看兼容说明",
      mia1: "今天能把更新说明发出去吗？", cMention: "@Claude Code 根据本周的改动起草一份。", askRead: "Claude Code 请求读取本周的改动", allow: "允许", deny: "拒绝", allowed: "已允许本次", denied: "已拒绝", ccNo: "好的，我不会读取。", ccBlind: "我看不到本周改动。请在“智能体可见”里打开。",
      docTitle: "更新说明 · v2.4", d1: "搜索速度提升一倍", d2: "移动端支持深色模式", d3: "修复 12 个问题", edit: "编辑", done: "完成", share: "分享", leo1: "写得好，发吧！", shareTo: "分享到", send: "发送", shared: "已分享到 ", and: " 和 ", cx1: "审查完成，没有阻塞项。", mia2: "好呀！", leo2: "三点见。",
      members: "成员", you: "你", me: "我", visible: "智能体可见", ctx1: "本周改动", ctx2: "客户名单", about: "关于",
      f1: "请来合适的智能体。@ 一下 Claude Code、Codex 或任何已接入的智能体，它会带着你选定的上下文加入。", f2: "始终由你掌控。为每个智能体选择可见的内容，敏感操作等你批准。", f3: "随时接着来。对话保存在你的设备上，目标与决定一直清晰可见。", tryCrew: "去发布小队试试",
      r1: "现在：Mac 上的本地智能体。13 种内置适配器、明确的授权，以及能延续的对话。", r2: "下一步：真人通讯与成果分享。和真人、智能体一起聊，把成果送进需要它的对话。", r3: "未来：跨设备，开放网络。多设备历史与基于 Lico Arc 协议的联邦互通，由你的端点做主。",
      g1: "什么是人与智能体协作？", g2: "日常使用场景", g3: "编码智能体接口对比", g4: "编排与协作有何不同", g5: "产品介绍", g6: "隐私与安全", g7: "本地优先架构", g8: "兼容说明",
      fact1: "以 AGPL-3.0-or-later 免费开源。", fact2: "v0.1.2，适用于 Apple 芯片 Mac。", fact3: "对话保存在你的设备上。", back: "会话列表", info: "详情", github: "GitHub" },
  };
  /* Language: ?lang= first, then the stored choice, then the browser. */
  const LANGUAGE_KEY = "licoup-site-language";
  const known = (value) => (value === "zh" || value === "en" ? value : null);
  const stored = () => { try { return localStorage.getItem(LANGUAGE_KEY); } catch { return null; } };
  let lang = known(new URLSearchParams(location.search).get("lang")) ?? known(stored()) ?? ((navigator.language || "en").startsWith("zh") ? "zh" : "en");
  const t = (key) => T[lang][key] ?? T.en[key] ?? key;
  const $ = (id) => document.getElementById(id), still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const clock = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const WHO = { lico: ["Lico", "av-lico", `<img src="/assets/licoup-mark.svg" alt="">`], mia: ["Mia", "av-mia", "M"], leo: ["Leo", "av-leo", "L"], cc: ["Claude Code", "av-cc", "C"], cx: ["Codex", "av-cx", "X"] };
  const av = (who) => `<b class="av ${WHO[who][1]}" aria-hidden="true">${WHO[who][2]}</b>`;
  const ai = (who) => (who === "cc" || who === "cx" ? '<em class="tag">AI</em>' : "");
  const AGENTS = "Claude Code, Codex, Cursor, GitHub Copilot, OpenCode, Antigravity, Kilo Code, OpenClaw, Hermes Agent, Kimi Code, Pi Agent, DeepSeek Harness, Lico Agent.";
  const GUIDES = [["g1", "/human-agent-collaboration-client/"], ["g2", "/use-cases/"], ["g3", "/guides/ai-coding-agents/"], ["g4", "/concepts/agent-orchestration-vs-collaboration/"], ["g5", "/product/"], ["g6", "/security/"], ["g7", "/architecture/"], ["g8", "/status/"]];
  const M = (who, key, link) => ({ k: "msg", who, key, link, at: clock() });
  const C = {
    lico: { mark: "lico", note: "nLico", chips: ["qWhat", "qAgents", "qPeople", "qOffline", "qGet"], log: [{ k: "intro" }, { k: "day" }, M("lico", "lico1"), M("lico", "lico3")] },
    crew: { mark: "users", group: true, note: "nCrew", chips: ["cMention"], log: [{ k: "day" }, M("mia", "mia1")], ctx: [true, false], unread: true },
    today: { mark: "spark", note: "nToday", chips: ["tryCrew", "qGet"], log: [{ k: "day" }, M("lico", "f1"), M("lico", "f2"), M("lico", "f3")] },
    roadmap: { mark: "arrow", note: "nRoadmap", chips: ["qPeople", "qGet"], log: [{ k: "day" }, M("lico", "r1"), M("lico", "r2"), M("lico", "r3")] },
    guides: { mark: "doc", note: "nGuides", chips: ["qWhat", "qGet"], log: [{ k: "day" }, { k: "links", who: "lico", at: clock(), list: GUIDES.map(([key, path]) => [key, SITE + path]) }] },
    agents: { mark: "hash", note: "nAgents", chips: ["qAgents", "qGet"], log: [{ k: "day" }, { k: "msg", who: "lico", text: AGENTS, at: clock() }, M("lico", "aAgents", ["lCompat", SITE + "/status/"])] },
  };
  /* Each conversation has an address, so a visitor can share or return to it. */
  const SLUG = { crew: "launch-crew", today: "features", roadmap: "roadmap", guides: "guides", agents: "agents" };
  const fromHash = () => Object.keys(SLUG).find((id) => SLUG[id] === location.hash.slice(1)) ?? "lico";
  let now = fromHash(), filter = "";
  const log = $("log"), input = $("input");
  const mark = (id) => C[id].mark === "lico" ? av("lico") : `<span class="av ${C[id].group ? "av-group" : "av-plain"}">${icon(C[id].mark)}</span>`;
  const preview = (id) => { const last = [...C[id].log].reverse().find((item) => item.k === "msg" || item.k === "sys" || item.k === "me"); return last ? esc(last.text ?? t(last.key)) : ""; };
  const drawList = () => {
    $("list").innerHTML = Object.keys(C).filter((id) => t(id).toLowerCase().includes(filter)).map((id) => `<li class="${id === now ? "on" : ""}"><button type="button" data-open="${id}">${mark(id)}<span><strong>${t(id)}</strong><span class="pv">${preview(id)}</span></span>${C[id].unread && id !== now ? '<i class="dot"></i>' : ""}</button></li>`).join("");
  };
  const node = (item) => {
    const el = document.createElement("div"); item.el = el;
    if (item.k === "intro") {
      el.className = "intro"; el.innerHTML = `<button class="fig" type="button" aria-label="Lico"></button><h1>${t("hero")}</h1><p>${t("heroSub")}</p>`;
      const fig = el.firstElementChild; window.Lico?.mount(fig);
      fig.addEventListener("click", () => { fig.dataset.mood = "happy"; clearTimeout(fig.timer); fig.timer = setTimeout(() => { fig.dataset.mood = "neutral"; }, 1500); });
    } else if (item.k === "day") { el.className = "day"; el.innerHTML = `<span>${t("today_")}</span>`; }
    else if (item.k === "sys") { el.className = "sys"; el.innerHTML = `<span>${icon("share")}${esc(item.text)}</span>`; }
    else if (item.k === "ask") {
      el.className = `ask${item.state === "ok" ? " ok" : item.state === "no" ? " no" : ""}`;
      const yes = item.href ? `<a class="pill pill-go" href="${item.href}" data-ask="ok">${t(item.yes)}</a>` : `<button class="pill pill-go" type="button" data-ask="ok">${t(item.yes)}</button>`;
      el.innerHTML = `<span class="ask-icon">${icon(item.state === "ok" ? "check" : "lock")}</span><span class="ask-text">${t(item.key)}</span><span class="ask-acts"><button class="pill" type="button" data-ask="no">${t(item.no)}</button>${yes}</span><span class="ask-done">${icon("check")}${t(item.okText)}</span><span class="ask-no">${t(item.noText)}</span>`;
      el.querySelectorAll("[data-ask]").forEach((button) => button.addEventListener("click", () => { item.state = button.dataset.ask; el.replaceWith(node(item)); item.then(item.state === "ok"); }));
    } else if (item.k === "me") { el.className = "msg me"; el.innerHTML = `<div class="bubble"><p>${esc(item.text).replace(/@(Claude Code|Codex|Mia|Leo)/g, "<mark>@$1</mark>")}</p></div>`; }
    else {
      el.className = `msg${item.who === "mia" || item.who === "leo" ? "" : " agent"}`;
      let body = `<div class="bubble"><p>${item.text ? esc(item.text) : t(item.key)}</p>${item.link ? `<p><a href="${item.link[1]}">${t(item.link[0])}</a></p>` : ""}</div>`;
      if (item.k === "links") body = `<div class="links">${item.list.map(([key, href]) => `<a href="${href}">${esc(t(key))}${icon("arrow")}</a>`).join("")}</div>`;
      if (item.k === "doc") body = `<div class="doc"><div class="doc-head">${icon("doc")}${t("docTitle")}</div><ul>${item.items.map((text) => `<li>${esc(text)}</li>`).join("")}</ul><div class="doc-acts"><button class="pill" type="button" data-doc="edit">${t("edit")}</button><button class="pill pill-go" type="button" data-doc="share">${icon("share")}${t("share")}</button></div></div>`;
      el.innerHTML = `${av(item.who)}<div><div class="meta">${WHO[item.who][0]}${ai(item.who)}<time>${item.at}</time></div>${body}</div>`;
      if (item.k === "doc") {
        const edit = el.querySelector('[data-doc="edit"]'), rows = [...el.querySelectorAll("li")];
        edit.addEventListener("click", () => { const on = rows[0].isContentEditable; rows.forEach((row) => { row.contentEditable = String(!on); }); edit.textContent = t(on ? "edit" : "done"); if (on) item.items = rows.map((row) => row.textContent.trim()).filter(Boolean); else rows[0].focus(); });
        el.querySelector('[data-doc="share"]').addEventListener("click", () => openShare(item));
      }
    }
    return el;
  };
  const bottom = () => { log.scrollTop = log.scrollHeight; };
  const push = (id, item) => { C[id].log.push(item); if (id === now) { log.append(node(item)); bottom(); } else C[id].unread = true; drawList(); };
  const say = (id, items, wait = 650) => {
    const who = items[0]?.who, typing = document.createElement("div");
    typing.className = "typing"; typing.innerHTML = `${who ? av(who) : ""}<span><i></i><i></i><i></i></span>`;
    if (id === now && who && !still) { log.append(typing); bottom(); }
    setTimeout(() => { typing.remove(); items.forEach((item, i) => setTimeout(() => push(id, { ...item, at: clock() }), still ? 0 : i * 520)); }, still ? 0 : wait);
  };
  const drawInfo = () => {
    const info = $("info");
    if (now === "crew") {
      const people = [["me", "you"], ["mia", "Mia Chen"], ["leo", "Leo Park"], ["cc", "Claude Code"], ["cx", "Codex"]];
      info.innerHTML = `<h2>${t("members")}</h2><ul class="people">${people.map(([who, name]) => `<li>${who === "me" ? `<span class="self"><b class="av av-me">${t("me")}</b>${t(name)}</span>` : `<button type="button" data-at="${WHO[who][0]}">${av(who)}${name}${ai(who)}</button>`}</li>`).join("")}</ul><h2>${t("visible")}</h2><ul class="ctx">${[0, 1].map((i) => `<li>${t(`ctx${i + 1}`)}<button class="sw" type="button" role="switch" aria-checked="${C.crew.ctx[i]}" aria-label="${t(`ctx${i + 1}`)}" data-ctx="${i}"></button></li>`).join("")}</ul>`;
    } else info.innerHTML = `<h2>${t("about")}</h2><ul class="facts"><li><span class="ic">${icon("github")}</span>${t("fact1")}</li><li><span class="ic">${icon("download")}</span>${t("fact2")}</li><li><span class="ic">${icon("lock")}</span>${t("fact3")}</li></ul><a class="cta" href="${DMG}">${icon("download")}${t("get")}</a>`;
  };
  const draw = () => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = lang === "zh" ? "LicoUp — 人与智能体，同频对话" : "LicoUp — People. Agents. One conversation.";
    $("search").placeholder = t("search"); $("lang").textContent = t("lang"); $("get").querySelector("span").textContent = t("get"); $("gh").setAttribute("aria-label", t("github"));
    $("back").setAttribute("aria-label", t("back")); $("info-toggle").setAttribute("aria-label", t("info")); $("send").setAttribute("aria-label", t("send"));
    $("head-av").innerHTML = mark(now); $("title").textContent = t(now); $("note").textContent = t(C[now].note); input.placeholder = t("box") + t(now);
    C[now].unread = false; log.replaceChildren(...C[now].log.map(node)); bottom();
    $("chips").innerHTML = C[now].chips.map((key) => `<button class="pill" type="button" data-chip="${key}">${t(key)}</button>`).join("");
    drawList(); drawInfo(); closeShare(); $("mention").classList.remove("open");
  };
  const open = (id) => { now = id; history.replaceState(null, "", SLUG[id] ? `#${SLUG[id]}` : location.pathname + location.search); $("app").classList.remove("is-list", "is-info"); draw(); if (matchMedia("(min-width: 721px)").matches) input.focus(); };

  /* ---------- what happens when something is sent ---------- */
  const lico = (id, text) => {
    const s = text.toLowerCase();
    if (/download|install|get it|下载|安装/.test(s)) return say(id, [{ k: "ask", who: "lico", key: "askGet", yes: "yesGet", no: "noGet", okText: "okGet", noText: "noGet", href: DMG, state: "open", then: (ok) => say(id, [M("lico", ok ? "aGot" : "aLater", ok ? ["lRelease", RELEASE] : null)]) }]);
    const key = /agent|adapter|claude|codex|cursor|智能体|支持|适配/.test(s) ? "aAgents" : /people|person|friend|team|human|真人|别人|其他人|聊天/.test(s) ? "aPeople" : /offline|local|privacy|private|离线|本地|隐私/.test(s) ? "aOffline" : /what|licoup|是什么|介绍|干什么/.test(s) ? "aWhat" : "aElse";
    say(id, [M("lico", key, key === "aAgents" ? ["lCompat", SITE + "/status/"] : null)]);
  };
  const crew = (text) => {
    if (/@claude code/i.test(text)) {
      if (!C.crew.ctx[0]) return say("crew", [M("cc", "ccBlind")]);
      return say("crew", [{ k: "ask", key: "askRead", yes: "allow", no: "deny", okText: "allowed", noText: "denied", state: "open", then: (ok) => ok ? say("crew", [{ k: "doc", who: "cc", items: [t("d1"), t("d2"), t("d3")] }, M("leo", "leo1")], 1100) : say("crew", [M("cc", "ccNo")]) }], 300);
    }
    say("crew", [/@codex/i.test(text) ? M("cx", "cx1") : /@leo/i.test(text) ? M("leo", "leo2") : M("mia", "mia2")]);
  };
  const send = (text) => { text = text.trim(); if (!text) return; push(now, { k: "me", text }); input.value = ""; sync(); if (now === "crew") crew(text); else lico(now, text); };

  /* ---------- sharing ---------- */
  const TARGETS = [["#announcements", "av-plain", icon("hash")], ["Customers", "av-group", icon("users")], ["Mia Chen", "av-mia", "M"]];
  let sharing = null;
  const closeShare = () => { $("share").classList.remove("open"); sharing = null; };
  const openShare = (item) => {
    sharing = { item, picked: new Set() };
    $("share").innerHTML = `<strong>${t("shareTo")}</strong>${TARGETS.map(([name, cls, glyph], i) => `<button class="row" type="button" role="checkbox" aria-checked="false" data-pick="${i}"><span class="av ${cls}">${glyph}</span>${name}<span class="tick">${icon("check")}</span></button>`).join("")}<button class="pill pill-go" type="button" id="share-send" disabled>${t("send")}</button>`;
    $("share").classList.add("open");
  };
  $("share").addEventListener("click", (event) => {
    const pick = event.target.closest("[data-pick]");
    if (pick) { const i = Number(pick.dataset.pick), on = !sharing.picked.has(i); on ? sharing.picked.add(i) : sharing.picked.delete(i); pick.classList.toggle("picked", on); pick.setAttribute("aria-checked", String(on)); $("share-send").disabled = !sharing.picked.size; }
    if (event.target.closest("#share-send") && sharing.picked.size) { const names = [...sharing.picked].sort().map((i) => TARGETS[i][0]); push("crew", { k: "sys", text: t("shared") + (names.length > 1 ? names.slice(0, -1).join(", ") + t("and") + names.at(-1) : names[0]) }); closeShare(); }
  });

  /* ---------- wiring ---------- */
  const NAMES = { "Claude Code": "cc", Codex: "cx", Mia: "mia", Leo: "leo" };
  const sync = () => {
    $("send").disabled = !input.value.trim();
    const at = now === "crew" ? input.value.match(/@([\w ]*)$/) : null, pop = $("mention");
    const hits = at ? Object.keys(NAMES).filter((name) => name.toLowerCase().startsWith(at[1].toLowerCase())) : [];
    pop.classList.toggle("open", hits.length > 0);
    pop.innerHTML = hits.map((name, i) => `<button class="row${i ? "" : " hot"}" type="button" role="option" data-at="${name}">${av(NAMES[name])}${name}${ai(NAMES[name])}</button>`).join("");
  };
  const mention = (name) => { const base = input.value.replace(/@[\w ]*$/, ""); input.value = `${base}${base && !base.endsWith(" ") ? " " : ""}@${name} `; input.focus(); sync(); };
  input.addEventListener("input", sync);
  input.addEventListener("keydown", (event) => { const hot = $("mention").querySelector(".hot"); if ((event.key === "Tab" || event.key === "Enter") && hot && $("mention").classList.contains("open")) { event.preventDefault(); mention(hot.dataset.at); } });
  $("composer").addEventListener("submit", (event) => { event.preventDefault(); send(input.value); });
  $("search").addEventListener("input", (event) => { filter = event.target.value.trim().toLowerCase(); drawList(); });
  $("lang").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; try { localStorage.setItem(LANGUAGE_KEY, lang); } catch { /* storage unavailable */ } draw(); });
  $("back").addEventListener("click", () => $("app").classList.toggle("is-list"));
  $("info-toggle").addEventListener("click", () => { const on = $("app").classList.toggle("is-info"); $("info-toggle").setAttribute("aria-expanded", String(on)); });
  document.addEventListener("click", (event) => {
    const to = event.target.closest("[data-open]"), chip = event.target.closest("[data-chip]"), at = event.target.closest("[data-at]"), ctx = event.target.closest("[data-ctx]");
    if (to) open(to.dataset.open);
    if (chip) chip.dataset.chip === "tryCrew" ? open("crew") : send(t(chip.dataset.chip));
    if (at) mention(at.dataset.at);
    if (ctx) { const i = Number(ctx.dataset.ctx); C.crew.ctx[i] = !C.crew.ctx[i]; ctx.setAttribute("aria-checked", String(C.crew.ctx[i])); }
    if (sharing && !event.target.closest("#share, [data-doc]")) closeShare();
    if (event.target.closest('a[href="#lico"]')) { event.preventDefault(); open("lico"); }
  });
  addEventListener("keydown", (event) => { if (event.key === "Escape") { closeShare(); $("mention").classList.remove("open"); $("app").classList.remove("is-list", "is-info"); } });
  addEventListener("hashchange", () => { if (fromHash() !== now) open(fromHash()); });
  draw(); sync();
})();
