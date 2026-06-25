/* ============================================================
   app.js — Portfolio IDE de Alberto Luque Rivas
   IDE vanilla + copiloto IA + i18n (ES·EN·DE·IT·FR) + temas
   ============================================================ */
(function () {
  "use strict";

  const P = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.prototype.slice.call(document.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const deaccent = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  const ls = {
    get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  const LANG_CODES = P.langs.map((l) => l.code);
  let lang = LANG_CODES.indexOf(ls.get("lang", "es")) >= 0 ? ls.get("lang", "es") : "es";
  let theme = ls.get("theme", "cyberpunk");

  const FILES = P.filesMeta;
  const fileByName = {};
  FILES.forEach((f) => (fileByName[f.name] = f));
  const baseName = (n) => n.replace(/\.[^.]+$/, "").toLowerCase();
  const FILE_BY_BASE = {};
  FILES.forEach((f) => (FILE_BY_BASE[baseName(f.name)] = f.name));

  const LANG_LABEL = { js: "JavaScript", json: "JSON", md: "Markdown", log: "Log", txt: "Plain Text", home: "Dashboard" };
  const GAME_TXT = {
    es: { play: "▶ Jugar", retry: "↻ Reintentar", hint: "Flechas / WASD · swipe en el móvil", over: "Game Over" },
    en: { play: "▶ Play", retry: "↻ Retry", hint: "Arrows / WASD · swipe on mobile", over: "Game Over" },
    de: { play: "▶ Spielen", retry: "↻ Nochmal", hint: "Pfeile / WASD · wischen am Handy", over: "Game Over" },
    it: { play: "▶ Gioca", retry: "↻ Riprova", hint: "Frecce / WASD · swipe su mobile", over: "Game Over" },
    fr: { play: "▶ Jouer", retry: "↻ Rejouer", hint: "Flèches / WASD · swipe sur mobile", over: "Game Over" },
  };
  const SOCIAL =
    '🌐 <a href="https://easysoft.es" target="_blank" rel="noopener">easysoft.es</a>\n' +
    '📚 <a href="https://wiki.easysoft.es" target="_blank" rel="noopener">wiki.easysoft.es</a>\n' +
    '🛒 <a href="https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60" target="_blank" rel="noopener">dolistore.com</a>\n' +
    '💼 <a href="https://es.linkedin.com/in/albertoluquerivas" target="_blank" rel="noopener">linkedin.com/in/albertoluquerivas</a>\n' +
    '🐙 <a href="https://github.com/aluquerivas-dev" target="_blank" rel="noopener">github.com/aluquerivas-dev</a>\n' +
    '📧 <a href="mailto:aluquerivasdev@gmail.com">aluquerivasdev@gmail.com</a>';

  const SPARK = '<svg class="ic-spark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.7 6.1L20 10l-6.3 1.9L12 18l-1.7-6.1L4 10l6.3-1.9z"/></svg>';

  const T = () => P.i18n[lang];

  let openTabs = [], active = null;
  const collapsedFolders = new Set();

  const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#00f0ff";
  let minimapRO = null;
  function clearMinimap() { if (minimapRO) { try { minimapRO.disconnect(); } catch (e) {} minimapRO = null; } }

  /* ---------- Resaltado de sintaxis ---------- */
  const GRAMMARS = {
    js: [
      ["comment", /\/\/[^\n]*/y], ["comment", /\/\*[\s\S]*?\*\//y],
      ["string", /"(?:\\.|[^"\\])*"/y], ["string", /'(?:\\.|[^'\\])*'/y], ["string", /`(?:\\.|[^`\\])*`/y],
      ["keyword", /\b(?:const|let|var|function|return|if|else|new|true|false|null|undefined|this|export|default|import|from|async|await|for|of|in|typeof|class|extends)\b/y],
      ["number", /\b\d+(?:\.\d+)?\b/y],
      ["prop", /[A-Za-z_$][\w$]*(?=\s*:)/y], ["func", /[A-Za-z_$][\w$]*(?=\s*\()/y],
    ],
    json: [
      ["key", /"(?:\\.|[^"\\])*"(?=\s*:)/y], ["string", /"(?:\\.|[^"\\])*"/y],
      ["number", /-?\b\d+(?:\.\d+)?\b/y], ["keyword", /\b(?:true|false|null)\b/y],
    ],
    md: [
      ["heading", /(?:^|(?<=\n))#{1,6}[^\n]*/y], ["bold", /\*\*[^*\n]+\*\*/y],
      ["code", /`[^`\n]+`/y], ["link", /\[[^\]\n]+\]\([^)\n]+\)/y],
      ["bullet", /(?:^|(?<=\n))[ \t]*[-*][ \t]+/y], ["quote", /(?:^|(?<=\n))>[^\n]*/y],
    ],
    log: [
      ["meta", /\[[^\]\n]*\]/y], ["keyword", /\b(?:INFO|OK|DONE|SUCCESS)\b/y],
      ["error", /\b(?:WARN|ERROR|FAIL)\b/y], ["comment", /(?:^|(?<=\n))#[^\n]*/y],
    ],
    txt: [],
  };
  function highlight(code, lng) {
    const rules = GRAMMARS[lng] || GRAMMARS.txt;
    let out = "", i = 0;
    while (i < code.length) {
      let matched = false;
      for (let r = 0; r < rules.length; r++) {
        const re = rules[r][1]; re.lastIndex = i;
        const m = re.exec(code);
        if (m && m.index === i && m[0].length) {
          out += '<span class="tok-' + rules[r][0] + '">' + esc(m[0]) + "</span>";
          i += m[0].length; matched = true; break;
        }
      }
      if (!matched) { out += esc(code[i]); i++; }
    }
    if (lng === "md") {
      out = out.replace(/<span class="tok-link">\[([^\]]+)\]\(([^)]+)\)<\/span>/g,
        (m, t, u) => (u === "#" ? '<span class="tok-link">' + t + "</span>"
          : '<a class="tok-link" href="' + u + '" target="_blank" rel="noopener">' + t + "</a>"));
    } else {
      out = out.replace(/(https?:\/\/[^\s"&<)]+)/g, '<a class="tok-link" href="$1" target="_blank" rel="noopener">$1</a>');
    }
    return out;
  }

  /* ---------- Markdown inline (para la IA) ---------- */
  function mdInline(s) {
    s = esc(s);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => (u === "#" ? t : '<a href="' + u + '" target="_blank" rel="noopener">' + t + "</a>"));
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return s;
  }

  /* ---------- i18n ---------- */
  function applyI18n() {
    const u = T().ui;
    $$(".menubar span[data-menu]").forEach((s) => (s.textContent = u.menu[s.dataset.menu]));
    $("#explorerLabel").textContent = u.explorer;
    $("#panelTermLabel").textContent = u.terminalTab.toUpperCase();
    $("#panelProbLabel").textContent = u.problems.toUpperCase();
    $("#panelOutLabel").textContent = u.output.toUpperCase();
    $("#statusMsg").textContent = u.statusReady;
    $("#paletteInput").placeholder = u.searchPlaceholder;
    $("#aiTitle").textContent = u.aiTitle;
    $("#aiSubtitle").textContent = u.aiSubtitle;
    $("#aiInput").placeholder = u.aiPlaceholder;
    $("#langTitle").textContent = u.langTitle; $("#langSub").textContent = u.langSubtitle;
    $("#themeTitle").textContent = u.themeTitle; $("#themeSub").textContent = u.themeSubtitle;
    $("#sidebarHint").innerHTML = "💡 " + esc(u.tip);
    $("#statusLangBtn").textContent = "🌐 " + lang.toUpperCase();
    document.documentElement.lang = lang;
    if (active && fileByName[active] && !fileByName[active].game) renderEditor(active);
    renderSuggestions();
  }

  /* ---------- Sidebar ---------- */
  function renderTree() {
    const tree = $("#tree"); tree.innerHTML = "";
    const fileLi = (f, pad) => {
      const li = document.createElement("li");
      li.className = "tree-item" + (f.name === active ? " active" : "");
      li.dataset.file = f.name;
      li.style.paddingLeft = pad + "px";
      li.innerHTML = '<span class="ic">' + f.icon + "</span>" + f.name;
      li.addEventListener("click", () => openFile(f.name));
      tree.appendChild(li);
    };
    // Archivos en la raíz (sin carpeta)
    FILES.filter((f) => !f.folder).forEach((f) => fileLi(f, 16));
    // Subcarpetas plegables
    const folders = [];
    FILES.forEach((f) => { if (f.folder && folders.indexOf(f.folder) === -1) folders.push(f.folder); });
    folders.forEach((folder) => {
      const collapsed = collapsedFolders.has(folder);
      const fl = document.createElement("li");
      fl.className = "tree-subfolder";
      fl.innerHTML = '<span class="tree-chevron">' + (collapsed ? "›" : "⌄") + '</span><span class="ic">' + (collapsed ? "📁" : "📂") + "</span>" + folder;
      fl.addEventListener("click", () => { collapsed ? collapsedFolders.delete(folder) : collapsedFolders.add(folder); renderTree(); });
      tree.appendChild(fl);
      if (!collapsed) FILES.filter((f) => f.folder === folder).forEach((f) => fileLi(f, 34));
    });
  }

  /* ---------- Pestañas ---------- */
  function renderTabs() {
    const tabs = $("#tabs"); tabs.innerHTML = "";
    openTabs.forEach((name) => {
      const f = fileByName[name];
      const tab = document.createElement("div");
      tab.className = "tab" + (name === active ? " active" : "");
      tab.dataset.file = name;
      tab.innerHTML = '<span class="ic">' + f.icon + '</span><span class="tab-name">' + name + '</span><span class="tab-close" title="x">✕</span>';
      tab.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab-close")) { closeTab(name); e.stopPropagation(); }
        else setActive(name);
      });
      tabs.appendChild(tab);
    });
  }

  /* ---------- Editor ---------- */
  function renderEditor(name) {
    stopGame(); clearMinimap();
    const f = fileByName[name];
    if (f.home) { renderDashboard(); $("#statusLn").textContent = "—"; return; }
    if (f.game) { renderGame(name); $("#statusLn").textContent = "GAME"; return; }
    if (f.moto) { renderMoto(name); $("#statusLn").textContent = "GAME"; return; }
    const content = name === "projects.json" ? buildProjectsJson() : (T().files[name] || "");
    const lineCount = content.split("\n").length;
    let gutter = "";
    for (let i = 1; i <= lineCount; i++) gutter += i + (i < lineCount ? "\n" : "");
    $("#editor").innerHTML =
      '<div class="editor-scroll"><div class="gutter">' + gutter + "</div>" +
      '<pre class="code"><code>' + highlight(content, f.lang) + "</code></pre></div>";
    $("#statusLn").textContent = "Ln 1, Col 1";
    buildMinimap($("#editor"), content);
  }
  function renderBreadcrumb(name) {
    const f = fileByName[name];
    let html = '<span class="crumb">portfolio</span>';
    if (f.folder) html += '<span class="crumb">' + f.folder + "</span>";
    html += '<span class="crumb">' + f.icon + " " + name + "</span>";
    $("#breadcrumb").innerHTML = html;
  }
  function welcomeScreen() {
    return '<div class="welcome"><h1>&lt;/&gt; Alberto Luque Rivas</h1>' +
      '<div class="sub">Full-Stack Developer · Dolibarr ERP · PHP · JavaScript</div>' +
      '<div class="keys"><kbd>Ctrl</kbd>+<kbd>P</kbd> · ' + SPARK + ' AI · 🌐 ' + lang.toUpperCase() + "</div></div>";
  }

  /* ---------- Dashboard (pantalla de inicio) ---------- */
  function buildProjectsJson() {
    const items = P.projectsData.map((p) =>
      '    { "name": ' + JSON.stringify(p.name) + ', "stack": ' + JSON.stringify(p.stack) +
      ', "desc": ' + JSON.stringify(p.desc[lang] || p.desc.en) + ', "url": ' + JSON.stringify(p.url) + " }");
    return '{\n  "projects": [\n' + items.join(",\n") + "\n  ]\n}";
  }

  function renderDashboard() {
    const d = P.dashI18n[lang] || P.dashI18n.en;
    const cards = P.projectsData.map((p) =>
      '<div class="proj-card" data-url="' + p.url + '">' +
      '<div class="proj-ic">' + p.icon + "</div>" +
      '<div class="proj-body"><div class="proj-name">' + esc(p.name) + "</div>" +
      '<div class="proj-desc">' + esc(p.desc[lang] || p.desc.en) + "</div>" +
      '<div class="proj-stack">' + p.stack.map((s) => "<span>" + esc(s) + "</span>").join("") + "</div></div>" +
      '<div class="proj-go">›</div></div>'
    ).join("");
    const stat = (n, l) => '<div class="stat-card"><div class="stat-num">' + n + '</div><div class="stat-lbl">' + esc(l) + "</div></div>";
    const links =
      '<a href="https://es.linkedin.com/in/albertoluquerivas" target="_blank" rel="noopener">💼 LinkedIn</a>' +
      '<a href="https://github.com/aluquerivas-dev" target="_blank" rel="noopener">🐙 GitHub</a>' +
      '<a href="https://www.dolistore.com/index.php?controller=search&search_query=easysoft&n=60" target="_blank" rel="noopener">🛒 Dolistore</a>' +
      '<a href="https://wiki.easysoft.es" target="_blank" rel="noopener">📚 Wiki</a>' +
      '<a href="https://easysoft.es" target="_blank" rel="noopener">🌐 easysoft.es</a>' +
      '<a href="mailto:aluquerivasdev@gmail.com">📧 Email</a>';
    $("#editor").innerHTML =
      '<div class="dash">' +
      '<section class="dash-hero"><div class="scanlines"></div>' +
      '<div class="dash-avatar"><img src="assets/img/albert.jpg" alt="Alberto Luque Rivas" onerror="this.remove()"><span class="av-mono">AL</span></div>' +
      '<div class="dash-hero-info">' +
      '<div class="dash-availability"><span class="dot"></span>' + esc(d.available) + "</div>" +
      '<h1 class="dash-name glitch" data-text="Alberto Luque Rivas">Alberto Luque Rivas<span class="caret">▍</span></h1>' +
      '<div class="dash-headline">' + esc(d.headline) + "</div>" +
      '<div class="dash-meta">🏢 EasySoft Tech S.L. · 📍 Córdoba, España</div>' +
      '<div class="dash-cta"><button class="dash-btn" data-act="ai">' + SPARK + " " + esc(d.askAI) + "</button>" +
      '<button class="dash-btn ghost" data-act="contact">✉️ ' + esc(d.hire) + "</button></div>" +
      "</div></section>" +
      '<section class="dash-stats">' + stat("100%", "Full-Stack") + stat("100%", "PHP / Laravel") + stat("SaaS", "ERP · APIs · IA") + stat("MEAN", "Mongo · Express · Angular · Node") + "</section>" +
      '<section class="dash-section"><h2>' + esc(d.featured) + '</h2><div class="proj-grid">' + cards + "</div></section>" +
      '<section class="dash-section"><h2>' + esc(d.activity) + '</h2><div class="contrib" id="contrib"></div></section>' +
      '<section class="dash-section"><h2>' + esc(d.quicklinks) + '</h2><div class="dash-links">' + links + "</div></section>" +
      "</div>";
    $$("#editor .dash-btn").forEach((b) => b.addEventListener("click", () => { if (b.dataset.act === "ai") openAI(true); else openFile("contact.md"); }));
    $$("#editor .proj-card").forEach((c) => c.addEventListener("click", () => { const u = c.dataset.url; if (u && u !== "#") window.open(u, "_blank", "noopener"); else openFile("projects.json"); }));
    buildContrib($("#contrib"));
  }

  function buildContrib(el) {
    if (!el) return;
    let html = "";
    for (let w = 0; w < 30; w++) {
      html += '<div class="cw">';
      for (let dd = 0; dd < 7; dd++) {
        const lvl = Math.random() < 0.42 ? 0 : 1 + Math.floor(Math.random() * 4);
        html += '<i class="cl l' + lvl + '"></i>';
      }
      html += "</div>";
    }
    el.innerHTML = html;
  }

  /* ---------- Minimapa ---------- */
  function buildMinimap(host, content) {
    const scrollEl = host.querySelector(".editor-scroll");
    if (!scrollEl) return;
    const canvas = document.createElement("canvas"); canvas.className = "minimap";
    const view = document.createElement("div"); view.className = "minimap-view";
    host.appendChild(canvas); host.appendChild(view);
    const lines = content.split("\n");
    const W = 66, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    const cCom = cssVar("--tok-comment"), cAcc = cssVar("--accent"), cFg = cssVar("--gutter-fg");
    function draw() {
      const H = host.clientHeight; if (!H) return;
      canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const lh = Math.max(1.4, Math.min(3.2, (H - 8) / Math.max(lines.length, 1)));
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i], tr = ln.trim(); if (!tr) continue;
        const y = 4 + i * lh; if (y > H) break;
        const indent = ln.length - ln.replace(/^\s+/, "").length;
        let c = cFg;
        if (/^(\/\/|#|\*|>)/.test(tr)) c = cCom;
        else if (/[{}\[\]:]|function|const|class|=>/.test(tr)) c = cAcc;
        ctx.globalAlpha = 0.5; ctx.fillStyle = c;
        ctx.fillRect(3 + indent * 0.7, y, Math.max(2, Math.min(W - 6 - indent * 0.7, tr.length * 0.7)), Math.max(1.2, lh - 0.7));
      }
      ctx.globalAlpha = 1; updateView();
    }
    function updateView() {
      const H = host.clientHeight, sh = scrollEl.scrollHeight, ch = scrollEl.clientHeight;
      if (sh <= ch + 2) { view.style.display = "none"; return; }
      view.style.display = "block";
      const ratio = H / sh;
      view.style.top = (scrollEl.scrollTop * ratio) + "px";
      view.style.height = Math.max(18, ch * ratio) + "px";
    }
    scrollEl.addEventListener("scroll", updateView);
    canvas.addEventListener("click", (e) => {
      const r = canvas.getBoundingClientRect();
      scrollEl.scrollTop = ((e.clientY - r.top) / r.height) * scrollEl.scrollHeight - scrollEl.clientHeight / 2;
    });
    minimapRO = new ResizeObserver(draw); minimapRO.observe(host);
    draw();
  }
  function setActive(name) {
    active = name; renderTabs(); renderTree(); renderEditor(name); renderBreadcrumb(name);
    $("#statusFileLang").textContent = LANG_LABEL[fileByName[name].lang] || "Plain Text";
  }
  function openFile(name) {
    if (!fileByName[name]) return false;
    if (openTabs.indexOf(name) === -1) openTabs.push(name);
    setActive(name);
    if (window.matchMedia("(max-width: 820px)").matches) $("#sidebar").classList.remove("open");
    return true;
  }
  function closeTab(name) {
    const idx = openTabs.indexOf(name); if (idx === -1) return;
    openTabs.splice(idx, 1);
    if (active === name) {
      const next = openTabs[idx] || openTabs[idx - 1] || null;
      if (next) setActive(next);
      else { active = null; stopGame(); renderTabs(); renderTree(); $("#editor").innerHTML = welcomeScreen(); $("#breadcrumb").innerHTML = ""; }
    } else renderTabs();
  }

  /* ---------- Mini-juego Snake ---------- */
  let gameCleanup = null;
  function stopGame() { if (gameCleanup) { try { gameCleanup(); } catch (e) {} gameCleanup = null; } }
  function renderGame(name) {
    const g = GAME_TXT[lang] || GAME_TXT.en;
    $("#editor").innerHTML =
      '<div class="game-wrap"><canvas class="game-canvas"></canvas>' +
      '<div class="game-hud"><span class="game-score">Score: 0</span><span class="game-best">Best: 0</span></div>' +
      '<div class="game-badge">🎮 game.js · canvas</div>' +
      '<div class="game-overlay"><div class="game-title">🐍 Snake</div>' +
      '<div class="game-msg">' + g.hint + '</div>' +
      '<button class="game-btn" type="button">' + g.play + "</button></div></div>";
    const wrap = $("#editor").querySelector(".game-wrap");
    const canvas = wrap.querySelector(".game-canvas");
    const ctx = canvas.getContext("2d");
    const scoreEl = wrap.querySelector(".game-score"), bestEl = wrap.querySelector(".game-best");
    const overlay = wrap.querySelector(".game-overlay"), btn = wrap.querySelector(".game-btn");
    const COLS = 24, ROWS = 16, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cell = 20, ox = 0, oy = 0, viewW = 0, viewH = 0;
    let snake, dir, nextDir, food, score, best, state, acc, last, raf, speed;
    try { best = parseInt(localStorage.getItem("snake-best") || "0", 10) || 0; } catch (e) { best = 0; }
    bestEl.textContent = "Best: " + best;
    const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#007acc";
    function fit() {
      viewW = wrap.clientWidth || 300; viewH = wrap.clientHeight || 200;
      canvas.width = viewW * dpr; canvas.height = viewH * dpr;
      canvas.style.width = viewW + "px"; canvas.style.height = viewH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(8, Math.floor(Math.min(viewW / COLS, viewH / ROWS)));
      ox = Math.floor((viewW - cell * COLS) / 2); oy = Math.floor((viewH - cell * ROWS) / 2);
      draw();
    }
    const ro = new ResizeObserver(fit); ro.observe(wrap);
    function placeFood() { do { food = { x: (Math.random() * COLS) | 0, y: (Math.random() * ROWS) | 0 }; } while (snake && snake.some((s) => s.x === food.x && s.y === food.y)); }
    function reset() { snake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }]; dir = { x: 1, y: 0 }; nextDir = { x: 1, y: 0 }; score = 0; speed = 120; acc = 0; last = 0; placeFood(); scoreEl.textContent = "Score: 0"; }
    function start() { reset(); state = "playing"; overlay.style.display = "none"; last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    function gameOver() {
      state = "over";
      if (score > best) { best = score; try { localStorage.setItem("snake-best", String(best)); } catch (e) {} bestEl.textContent = "Best: " + best; }
      overlay.querySelector(".game-title").textContent = "💀 " + g.over;
      overlay.querySelector(".game-msg").innerHTML = "Score: <b>" + score + "</b> · Best: <b>" + best + "</b>";
      btn.textContent = g.retry; overlay.style.display = "";
    }
    function step() {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || snake.some((s) => s.x === head.x && s.y === head.y)) { gameOver(); return; }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) { score++; scoreEl.textContent = "Score: " + score; if (speed > 60) speed -= 2; placeFood(); } else snake.pop();
    }
    function loop(t) {
      if (state !== "playing") return;
      if (!last) last = t; acc += t - last; last = t;
      let guard = 0;
      while (acc >= speed && guard++ < 8) { step(); acc -= speed; if (state !== "playing") { draw(); return; } }
      draw(); raf = requestAnimationFrame(loop);
    }
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function draw() {
      const W = COLS * cell, H = ROWS * cell;
      ctx.clearRect(0, 0, viewW, viewH);
      ctx.fillStyle = cssVar("--editor"); ctx.fillRect(ox, oy, W, H);
      ctx.strokeStyle = "rgba(127,127,127,.08)"; ctx.lineWidth = 1;
      for (let i = 0; i <= COLS; i++) { ctx.beginPath(); ctx.moveTo(ox + i * cell + .5, oy); ctx.lineTo(ox + i * cell + .5, oy + H); ctx.stroke(); }
      for (let j = 0; j <= ROWS; j++) { ctx.beginPath(); ctx.moveTo(ox, oy + j * cell + .5); ctx.lineTo(ox + W, oy + j * cell + .5); ctx.stroke(); }
      if (food) { ctx.fillStyle = cssVar("--tok-keyword"); ctx.font = "bold " + (cell * 0.95) + "px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(";", ox + food.x * cell + cell / 2, oy + food.y * cell + cell / 2 + 1); }
      if (snake) snake.forEach((s, i) => { ctx.fillStyle = i === 0 ? cssVar("--tok-link") : cssVar("--accent"); rr(ox + s.x * cell + 1, oy + s.y * cell + 1, cell - 2, cell - 2, 4); ctx.fill(); });
    }
    function setDir(x, y) { if (state !== "playing") return; if (dir.x === -x && dir.y === -y) return; nextDir = { x: x, y: y }; }
    function onKey(e) {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      const k = e.key.toLowerCase();
      if (k === "arrowup" || k === "w") setDir(0, -1);
      else if (k === "arrowdown" || k === "s") setDir(0, 1);
      else if (k === "arrowleft" || k === "a") setDir(-1, 0);
      else if (k === "arrowright" || k === "d") setDir(1, 0);
      else return;
      e.preventDefault();
    }
    document.addEventListener("keydown", onKey);
    let tsx = 0, tsy = 0;
    const onTS = (e) => { const t = e.changedTouches[0]; tsx = t.clientX; tsy = t.clientY; };
    const onTE = (e) => { const t = e.changedTouches[0], dx = t.clientX - tsx, dy = t.clientY - tsy; if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return; if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0); else setDir(0, dy > 0 ? 1 : -1); };
    canvas.addEventListener("touchstart", onTS, { passive: true });
    canvas.addEventListener("touchend", onTE, { passive: true });
    btn.addEventListener("click", start);
    reset(); fit(); state = "ready";
    gameCleanup = function () { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener("keydown", onKey); };
  }

  /* ---------- Mini-juego "Moto Run" (endless runner estilo dino) ---------- */
  const MOTO_TXT = {
    es: { play: "▶ Acelerar", retry: "↻ Otra vuelta", hint: "Salta los obstáculos · Espacio / ↑ / toca", over: "¡Te estrellaste!", dist: "Distancia" },
    en: { play: "▶ Ride", retry: "↻ Retry", hint: "Jump the obstacles · Space / ↑ / tap", over: "You crashed!", dist: "Distance" },
    de: { play: "▶ Losfahren", retry: "↻ Nochmal", hint: "Springe über Hindernisse · Leertaste / ↑ / tippen", over: "Crash!", dist: "Distanz" },
    it: { play: "▶ Parti", retry: "↻ Riprova", hint: "Salta gli ostacoli · Spazio / ↑ / tocca", over: "Ti sei schiantato!", dist: "Distanza" },
    fr: { play: "▶ Rouler", retry: "↻ Rejouer", hint: "Saute les obstacles · Espace / ↑ / touche", over: "Tu t'es crashé !", dist: "Distance" },
  };
  function renderMoto(name) {
    const g = MOTO_TXT[lang] || MOTO_TXT.en;
    $("#editor").innerHTML =
      '<div class="game-wrap"><canvas class="game-canvas"></canvas>' +
      '<div class="game-hud"><span class="game-score">0</span><span class="game-best">Best: 0</span></div>' +
      '<div class="game-badge">🏍️ moto.js · canvas</div>' +
      '<div class="game-overlay"><div class="game-title">🏍️ Moto Run</div>' +
      '<div class="game-msg">' + g.hint + "</div>" +
      '<button class="game-btn" type="button">' + g.play + "</button></div></div>";
    const wrap = $("#editor").querySelector(".game-wrap");
    const canvas = wrap.querySelector(".game-canvas");
    const ctx = canvas.getContext("2d");
    const scoreEl = wrap.querySelector(".game-score"), bestEl = wrap.querySelector(".game-best");
    const overlay = wrap.querySelector(".game-overlay"), btn = wrap.querySelector(".game-btn");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const G = 2600, JUMP = 860, MOTO_W = 44;
    let viewW = 0, viewH = 0, ground = 0;
    let moto, obstacles, speed, dist, score, state, last, raf, spawnTimer, lineOff;
    let best; try { best = parseInt(localStorage.getItem("moto-best") || "0", 10) || 0; } catch (e) { best = 0; }
    bestEl.textContent = "Best: " + best;
    function fit() {
      viewW = wrap.clientWidth || 300; viewH = wrap.clientHeight || 200;
      canvas.width = viewW * dpr; canvas.height = viewH * dpr;
      canvas.style.width = viewW + "px"; canvas.style.height = viewH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ground = viewH - Math.max(46, Math.floor(viewH * 0.2));
      draw();
    }
    const ro = new ResizeObserver(fit); ro.observe(wrap);
    function reset() { moto = { y: 0, vy: 0, grounded: true }; obstacles = []; speed = 340; dist = 0; score = 0; spawnTimer = 0.9; lineOff = 0; scoreEl.textContent = "0"; }
    function start() { reset(); state = "playing"; overlay.style.display = "none"; last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    function gameOver() {
      state = "over";
      if (score > best) { best = score; try { localStorage.setItem("moto-best", String(best)); } catch (e) {} bestEl.textContent = "Best: " + best; }
      overlay.querySelector(".game-title").textContent = "💥 " + g.over;
      overlay.querySelector(".game-msg").innerHTML = g.dist + ": <b>" + score + "</b> · Best: <b>" + best + "</b>";
      btn.textContent = g.retry; overlay.style.display = "";
    }
    function jump() {
      if (state === "ready" || state === "over") { start(); return; }
      if (state === "playing" && moto.grounded) { moto.vy = -JUMP; moto.grounded = false; }
    }
    function step(dt) {
      dist += speed * dt; lineOff = (lineOff + speed * dt) % 42; speed += 16 * dt;
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        const tall = Math.random() < 0.32;
        obstacles.push({ x: viewW + 12, w: tall ? 16 : 22, h: tall ? 44 : 26 });
        spawnTimer = Math.max(0.5, (Math.random() * 0.5 + 0.75) - (speed - 340) / 1100);
      }
      moto.vy += G * dt; moto.y += moto.vy * dt;
      if (moto.y >= 0) { moto.y = 0; moto.vy = 0; moto.grounded = true; }
      const mL = 70, mR = 70 + MOTO_W, mB = ground + moto.y;
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i]; o.x -= speed * dt;
        if (o.x + o.w < -4) { obstacles.splice(i, 1); continue; }
        if (mR > o.x + 5 && mL < o.x + o.w - 3 && mB > ground - o.h + 3) { gameOver(); return; }
      }
      score = Math.floor(dist / 10); scoreEl.textContent = String(score);
    }
    function draw() {
      ctx.clearRect(0, 0, viewW, viewH);
      ctx.fillStyle = cssVar("--editor"); ctx.fillRect(0, 0, viewW, viewH);
      ctx.strokeStyle = cssVar("--accent"); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, ground + 1); ctx.lineTo(viewW, ground + 1); ctx.stroke();
      ctx.strokeStyle = cssVar("--gutter-fg"); ctx.lineWidth = 2;
      for (let x = -lineOff; x < viewW; x += 42) { ctx.beginPath(); ctx.moveTo(x, ground + 14); ctx.lineTo(x + 20, ground + 14); ctx.stroke(); }
      for (const o of obstacles) {
        const oTop = ground - o.h;
        ctx.fillStyle = cssVar("--tok-error");
        ctx.beginPath(); ctx.moveTo(o.x + o.w / 2, oTop); ctx.lineTo(o.x, ground); ctx.lineTo(o.x + o.w, ground); ctx.closePath(); ctx.fill();
        ctx.fillStyle = cssVar("--accent"); ctx.fillRect(o.x, oTop - 2, o.w, 2);
      }
      ctx.save();
      ctx.translate(70 + MOTO_W, ground + moto.y + 5);
      ctx.scale(-1, 1);
      ctx.font = "34px serif"; ctx.textAlign = "left"; ctx.textBaseline = "bottom";
      ctx.fillText("🏍️", 0, 0);
      ctx.restore();
    }
    function loop(t) {
      if (state !== "playing") return;
      if (!last) last = t;
      let dt = (t - last) / 1000; last = t; if (dt > 0.05) dt = 0.05;
      step(dt); if (state !== "playing") { draw(); return; }
      draw(); raf = requestAnimationFrame(loop);
    }
    function onKey(e) {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      if (e.key === " " || e.code === "Space" || e.key === "ArrowUp" || (e.key || "").toLowerCase() === "w") { jump(); e.preventDefault(); }
    }
    document.addEventListener("keydown", onKey);
    wrap.addEventListener("pointerdown", (e) => { if (e.target !== btn) jump(); });
    btn.addEventListener("click", (e) => { e.stopPropagation(); start(); });
    reset(); fit(); state = "ready";
    gameCleanup = function () { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener("keydown", onKey); };
  }

  /* ---------- Copiloto IA ---------- */
  let aiGreeted = false;
  function aiPush(role, html) {
    const d = document.createElement("div");
    d.className = "ai-msg ai-" + role;
    d.innerHTML = (role === "bot" ? '<span class="ai-av">' + SPARK + "</span>" : "") + '<div class="ai-bubble">' + html + "</div>";
    $("#aiMessages").appendChild(d);
    $("#aiMessages").scrollTop = $("#aiMessages").scrollHeight;
    return d;
  }
  function aiReply(text) {
    const n = deaccent(text.toLowerCase());
    if (/(^|\W)(hola|hi|hey|hello|hallo|ciao|salut|bonjour|buenas)(\W|$)/.test(n)) return T().ai.greeting;
    for (let k = 0; k < P.intents.length; k++) {
      const it = P.intents[k];
      for (let j = 0; j < it.kw.length; j++) {
        if (n.indexOf(deaccent(it.kw[j])) !== -1) return T().ai.answers[it.id] || T().ai.answers.fallback;
      }
    }
    return T().ai.answers.fallback;
  }
  function aiAsk(text) {
    text = (text || "").trim(); if (!text) return;
    aiPush("user", esc(text));
    const typing = aiPush("bot", '<span class="ai-typing"><i></i><i></i><i></i></span>');
    setTimeout(() => { typing.querySelector(".ai-bubble").innerHTML = mdInline(aiReply(text)); $("#aiMessages").scrollTop = $("#aiMessages").scrollHeight; }, 600);
  }
  function renderSuggestions() {
    const wrap = $("#aiSuggest"); wrap.innerHTML = "";
    T().ai.suggestions.forEach((s) => {
      const b = document.createElement("button");
      b.className = "ai-chip"; b.type = "button"; b.textContent = s.label;
      b.addEventListener("click", () => { openAI(true); aiAsk(s.q); });
      wrap.appendChild(b);
    });
  }
  function openAI(force) {
    const main = $("#ideMain");
    if (force === true) main.classList.add("ai-open");
    else if (force === false) main.classList.remove("ai-open");
    else main.classList.toggle("ai-open");
    $("#actAI").classList.toggle("active", main.classList.contains("ai-open"));
    if (main.classList.contains("ai-open") && !aiGreeted) { aiGreeted = true; aiPush("bot", mdInline(T().ai.greeting)); }
    if (main.classList.contains("ai-open")) setTimeout(() => $("#aiInput").focus(), 50);
  }

  /* ---------- Terminal ---------- */
  function termPrint(html, cls) {
    const d = document.createElement("div");
    d.className = "term-line" + (cls ? " " + cls : ""); d.innerHTML = html;
    $("#termOutput").appendChild(d); $("#terminal").scrollTop = $("#terminal").scrollHeight;
  }
  function resolveFile(a) { if (!a) return null; a = a.toLowerCase(); if (fileByName[a]) return a; return FILE_BY_BASE[a] || null; }
  const cmdHistory = []; let histPos = 0;
  function runCommand(line) {
    const raw = line.trim(); if (!raw) return;
    termPrint('<span class="term-prompt">alberto@portfolio</span><span class="term-path">:~$</span> ' + esc(line));
    cmdHistory.push(line); histPos = cmdHistory.length;
    const parts = raw.split(/\s+/), cmd = parts[0].toLowerCase(), args = parts.slice(1);
    const u = T().ui;
    if (cmd === "help") termPrint(esc(u.help));
    else if (cmd === "ls") termPrint(FILES.map((f) => f.icon + " " + f.name).join("\n"));
    else if (cmd === "clear") $("#termOutput").innerHTML = "";
    else if (cmd === "whoami") termPrint("Alberto Luque Rivas — Full-Stack Developer");
    else if (cmd === "date") termPrint(esc(new Date().toString()));
    else if (cmd === "social") termPrint(SOCIAL);
    else if (cmd === "secret" || cmd === "tesoro" || cmd === "treasure" || cmd === "konami") {
      const s = SECRET_TXT[lang] || SECRET_TXT.en;
      termPrint('<span class="f-warn">' + s.clue + "</span>", "");
      termPrint('<span class="f-ok">↑ ↑ ↓ ↓ ← → ← → B A</span>', "");
    }
    else if (cmd === "gto" || cmd === "onizuka" || cmd === "eikichi") {
      const t = GTO_TXT[lang] || GTO_TXT.en;
      termPrint('<span class="f-ok">🏍️😎 ' + t.title + "</span> — " + t.quote, "");
      showGtoCard();
    }
    else if (cmd === "open" || cmd === "cat") {
      const n = resolveFile(args[0]);
      if (!n) termPrint(cmd + ": " + esc(args[0] || "") + " ✗", "err");
      else if (cmd === "cat") termPrint(esc(T().files[n] || ""));
      else { openFile(n); termPrint(u.opening + " " + n + "…", "muted"); }
    }
    else if (cmd === "ai") { openAI(true); const q = args.join(" "); if (q) aiAsk(q); }
    else if (cmd === "lang") { if (LANG_CODES.indexOf(args[0]) >= 0) { setLang(args[0]); termPrint("lang → " + args[0], "ok"); } else termPrint("lang: es|en|de|it|fr", "muted"); }
    else if (cmd === "theme") { if (P.themes.some((t) => t.id === args[0])) { setTheme(args[0]); termPrint("theme → " + args[0], "ok"); } else termPrint("theme: dark|light|dracula|synthwave", "muted"); }
    else if (fileByName[cmd + ".js"] || fileByName[cmd + ".json"] || fileByName[cmd + ".md"] || fileByName[cmd + ".log"] || FILE_BY_BASE[cmd]) {
      const n = FILE_BY_BASE[cmd]; openFile(n); termPrint(u.opening + " " + n + "…", "muted");
    }
    else termPrint("command not found: " + esc(cmd), "err");
  }

  /* ---------- Idioma ---------- */
  function buildLangList() {
    const list = $("#langList"); list.innerHTML = "";
    P.langs.forEach((l) => {
      const li = document.createElement("li");
      li.className = "picker-item" + (l.code === lang ? " active" : "");
      li.innerHTML = '<span class="pk-flag">' + l.flag + '</span><span class="pk-name">' + l.name + " <small>(" + l.code + ")</small></span>" +
        '<span class="pk-badge">' + (l.code === lang ? T().ui.langActive : T().ui.langInstall) + "</span>";
      li.addEventListener("click", () => { setLang(l.code); hide("langOverlay"); });
      list.appendChild(li);
    });
  }
  function setLang(code) { lang = code; ls.set("lang", code); applyI18n(); buildLangList(); }

  /* ---------- Tema ---------- */
  function buildThemeList() {
    const list = $("#themeList"); list.innerHTML = "";
    P.themes.forEach((t) => {
      const li = document.createElement("li");
      li.className = "picker-item" + (t.id === theme ? " active" : "");
      li.innerHTML = '<span class="pk-swatch theme-' + t.id + '"></span><span class="pk-name">' + t.name + "</span>" +
        '<span class="pk-badge">' + (t.id === theme ? "●" : "○") + "</span>";
      li.addEventListener("click", () => { setTheme(t.id); hide("themeOverlay"); });
      list.appendChild(li);
    });
  }
  function setTheme(id) {
    theme = id; ls.set("theme", id);
    document.documentElement.setAttribute("data-theme", id);
    const t = P.themes.find((x) => x.id === id);
    $("#statusThemeBtn").textContent = "🎨 " + (t ? t.name.replace(/ .*/, "") : id);
    buildThemeList();
  }

  /* ---------- Overlays genéricos ---------- */
  function show(id) { $("#" + id).hidden = false; }
  function hide(id) { $("#" + id).hidden = true; }

  /* ---------- Paleta de comandos ---------- */
  let palItems = [], palIdx = 0;
  function openPalette() { show("paletteOverlay"); $("#paletteInput").value = ""; renderPalette(""); $("#paletteInput").focus(); }
  function renderPalette(q) {
    q = q.toLowerCase();
    palItems = FILES.filter((f) => f.name.toLowerCase().indexOf(q) !== -1); palIdx = 0;
    $("#paletteList").innerHTML = palItems.map((f, i) =>
      '<li class="palette-item' + (i === 0 ? " active" : "") + '" data-file="' + f.name + '"><span class="ic">' + f.icon + "</span>" + f.name +
      '<span class="muted">' + (LANG_LABEL[f.lang] || "") + "</span></li>").join("");
    $$("#paletteList .palette-item").forEach((li) => li.addEventListener("click", () => { openFile(li.dataset.file); hide("paletteOverlay"); }));
  }
  function movePal(d) {
    const items = $("#paletteList").children; if (!items.length) return;
    items[palIdx] && items[palIdx].classList.remove("active");
    palIdx = (palIdx + d + items.length) % items.length;
    items[palIdx].classList.add("active"); items[palIdx].scrollIntoView({ block: "nearest" });
  }

  /* ---------- Eventos ---------- */
  function wire() {
    // terminal
    $("#termInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { runCommand($("#termInput").value); $("#termInput").value = ""; }
      else if (e.key === "ArrowUp") { if (histPos > 0) { histPos--; $("#termInput").value = cmdHistory[histPos] || ""; } e.preventDefault(); }
      else if (e.key === "ArrowDown") { if (histPos < cmdHistory.length - 1) { histPos++; $("#termInput").value = cmdHistory[histPos] || ""; } else { histPos = cmdHistory.length; $("#termInput").value = ""; } e.preventDefault(); }
    });
    $("#terminal").addEventListener("click", () => { if (window.getSelection().toString() === "") $("#termInput").focus(); });
    $("#termClear").addEventListener("click", () => ($("#termOutput").innerHTML = ""));
    $("#panelToggle").addEventListener("click", togglePanel);
    // activity bar
    $("#actExplorer").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
    $("#actSearch").addEventListener("click", openPalette);
    $("#actAI").addEventListener("click", () => openAI());
    $("#actLang").addEventListener("click", () => { buildLangList(); show("langOverlay"); });
    $("#actRun").addEventListener("click", () => openFile("game.js"));
    $("#actTheme").addEventListener("click", () => { buildThemeList(); show("themeOverlay"); });
    $("#hamburger").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
    // Plegar/desplegar la carpeta PORTFOLIO
    const treeFolder = document.querySelector(".tree-folder");
    if (treeFolder) {
      treeFolder.addEventListener("click", () => {
        const collapsed = $("#tree").classList.toggle("collapsed");
        const ch = treeFolder.querySelector(".tree-chevron");
        if (ch) ch.textContent = collapsed ? "›" : "⌄";
      });
    }
    // status bar
    $("#statusLangBtn").addEventListener("click", () => { buildLangList(); show("langOverlay"); });
    $("#statusThemeBtn").addEventListener("click", () => { buildThemeList(); show("themeOverlay"); });
    // AI panel
    $("#aiForm").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#aiInput").value; $("#aiInput").value = ""; aiAsk(v); });
    $("#aiClose").addEventListener("click", () => openAI(false));
    // menubar
    $$(".menubar span[data-menu]").forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        const k = el.dataset.menu;
        if (k === "file" || k === "go") openPalette();
        else if (k === "view") { buildThemeList(); show("themeOverlay"); }
        else if (k === "run") openFile("game.js");
        else if (k === "terminal") togglePanel();
        else if (k === "help") openFile("README.md");
        else $("#termInput").focus();
      });
    });
    // overlays close
    $$(".picker-close").forEach((b) => b.addEventListener("click", () => hide(b.dataset.close)));
    $$(".picker-overlay").forEach((ov) => ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; }));
    $("#paletteOverlay").addEventListener("click", (e) => { if (e.target === $("#paletteOverlay")) hide("paletteOverlay"); });
    $("#paletteInput").addEventListener("input", () => renderPalette($("#paletteInput").value));
    $("#paletteInput").addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { movePal(1); e.preventDefault(); }
      else if (e.key === "ArrowUp") { movePal(-1); e.preventDefault(); }
      else if (e.key === "Enter") { const f = palItems[palIdx]; if (f) { openFile(f.name); hide("paletteOverlay"); } }
      else if (e.key === "Escape") hide("paletteOverlay");
    });
    // global keys
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") { openPalette(); e.preventDefault(); }
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") { openAI(); e.preventDefault(); }
      else if (e.key === "Escape") { ["paletteOverlay", "langOverlay", "themeOverlay"].forEach((id) => ($("#" + id).hidden = true)); }
      else if ((e.ctrlKey || e.metaKey) && e.key === "`") { togglePanel(); e.preventDefault(); }
    });
  }
  function togglePanel() { $("#panel").classList.toggle("collapsed"); $("#panelToggle").textContent = $("#panel").classList.contains("collapsed") ? "⌃" : "⌄"; }

  /* ---------- Reloj ---------- */
  function tick() { const d = new Date(); $("#statusClock").textContent = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }

  /* ---------- Bienvenida terminal ---------- */
  function termWelcome() {
    termPrint("Welcome to <b>alberto@portfolio</b> 💻  ·  " + SPARK + " Ask Alberto AI  ·  🌐 5 idiomas", "ok");
    termPrint('<span class="cmd-link" data-cmd="help">help</span> · <span class="cmd-link" data-cmd="ai">ai</span> · <span class="cmd-link" data-cmd="game">game</span>', "muted");
    $$(".cmd-link").forEach((el) => el.addEventListener("click", () => { runCommand(el.dataset.cmd); $("#termInput").focus(); }));
  }

  /* ---------- Boot splash ---------- */
  function runBoot() {
    const boot = $("#boot");
    let booted = false; try { booted = !!sessionStorage.getItem("booted"); } catch (e) {}
    if (booted) { boot.parentNode && boot.parentNode.removeChild(boot); return; }
    const lines = T().ui.boot, log = $("#bootLog");
    let i = 0, done = false;
    function close() { if (done) return; done = true; try { sessionStorage.setItem("booted", "1"); } catch (e) {} boot.classList.add("hide"); setTimeout(() => boot.parentNode && boot.parentNode.removeChild(boot), 500); }
    (function next() {
      if (done) return;
      if (i < lines.length) { log.textContent += (i ? "\n" : "") + lines[i]; i++; setTimeout(next, 360); }
      else { const be = $("#bootEnter"); if (be) be.hidden = false; setTimeout(close, 1100); }
    })();
    $("#bootEnter").addEventListener("click", close);
    boot.addEventListener("click", close);
  }

  /* ---------- Feeds técnicos en vivo (PROBLEMS / OUTPUT) ---------- */
  function feedRand(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function feedPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  const FEED_FILES = ["Hero.tsx", "app.js", "data.js", "api/projects.php", "Dashboard.vue", "auth.service.ts", "webhook.php", "Invoice.php", "mensaru/Bot.php"];
  const OUTPUT_POOL = [
    () => '<span class="f-tag">[vite]</span> hmr update <span class="f-dim">/src/' + feedPick(FEED_FILES) + "</span>",
    () => '<span class="f-tag">[server]</span> <span class="f-ok">GET</span> /api/projects <span class="f-ok">200</span> <span class="f-dim">' + feedRand(4, 40) + "ms</span>",
    () => '<span class="f-tag">[server]</span> <span class="f-info">POST</span> /api/contact <span class="f-ok">200</span> <span class="f-dim">' + feedRand(8, 60) + "ms</span>",
    () => '<span class="f-tag">[build]</span> compiled <span class="f-ok">successfully</span> in <span class="f-dim">' + feedRand(120, 900) + "ms</span>",
    () => '<span class="f-tag">[docker]</span> albert-portfolio: <span class="f-ok">healthy</span>',
    () => '<span class="f-tag">[db]</span> query ok <span class="f-dim">(' + feedRand(1, 25) + "ms · " + feedRand(1, 120) + " rows)</span>",
    () => '<span class="f-tag">[ws]</span> client connected <span class="f-dim">(' + feedRand(1, 9) + " online)</span>",
    () => '<span class="f-ok">✓</span> ' + feedRand(40, 260) + ' tests passed <span class="f-dim">(' + feedRand(300, 1400) + "ms)</span>",
    () => '<span class="f-tag">[deploy]</span> pushing to production… <span class="f-ok">done</span>',
    () => '<span class="f-tag">[cache]</span> <span class="f-ok">HIT</span> <span class="f-dim">/assets/' + feedPick(FEED_FILES) + "</span>",
    () => '<span class="f-tag">[git]</span> fetch origin · <span class="f-ok">up to date</span>',
    () => '<span class="f-tag">[api]</span> Mensaru webhook delivered <span class="f-ok">✓</span>',
  ];
  const PROBLEMS_POOL = [
    () => '<span class="f-ok">✓</span> TypeScript: no errors <span class="f-dim">(' + feedRand(800, 2400) + " files)</span>",
    () => '<span class="f-ok">✓</span> ESLint: <span class="f-ok">0 problems</span>',
    () => '<span class="f-info">ℹ</span> Indexing workspace… <span class="f-dim">' + feedRand(2000, 9000) + " symbols</span>",
    () => '<span class="f-ok">✓</span> Security audit: <span class="f-ok">0 vulnerabilities</span>',
    () => '<span class="f-info">ℹ</span> Analyzing dependencies… <span class="f-ok">ok</span>',
    () => '<span class="f-warn">⚠</span> Hint: coffee level low <span class="f-dim">☕</span>',
    () => '<span class="f-ok">✓</span> No circular dependencies',
    () => '<span class="f-info">ℹ</span> Type-checking ' + feedRand(50, 400) + " modules…",
    () => '<span class="f-ok">✓</span> a11y check passed',
    () => '<span class="f-warn">⚠</span> TODO: take over the world <span class="f-dim">(low priority)</span>',
    () => '<span class="f-ok">✓</span> Build cache valid',
    () => '<span class="f-info">ℹ</span> Optimizing bundle… <span class="f-dim">-' + feedRand(8, 40) + "%</span>",
  ];
  function startFeed(el, pool, interval) {
    if (!el) return;
    function tick() {
      const div = document.createElement("div");
      div.className = "feed-line";
      div.innerHTML = feedPick(pool)();
      el.appendChild(div);
      while (el.children.length > 60) el.removeChild(el.firstChild);
      if (!el.hidden) el.scrollTop = el.scrollHeight;
    }
    for (let i = 0; i < 6; i++) tick();
    setInterval(tick, interval);
  }
  function wirePanelTabs() {
    const map = [
      { tab: "#panelTermLabel", view: "#terminal" },
      { tab: "#panelProbLabel", view: "#problems" },
      { tab: "#panelOutLabel", view: "#output" },
    ];
    map.forEach((pm) => {
      const t = $(pm.tab); if (!t) return;
      t.style.cursor = "pointer";
      t.addEventListener("click", () => {
        map.forEach((x) => {
          $(x.tab).classList.toggle("active", x === pm);
          const v = $(x.view); if (v) v.hidden = x !== pm;
        });
        const v = $(pm.view);
        if (v) v.scrollTop = v.scrollHeight;
        if (pm.view === "#terminal") $("#termInput").focus();
      });
    });
  }

  /* ---------- Menú contextual estilo VS Code (bloquea el del navegador) ---------- */
  function copyText(txt) {
    try { navigator.clipboard.writeText(txt); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = txt;
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e2) {}
      ta.remove();
    }
  }
  const CTX_TXT = {
    es: { open: "Abrir", copyName: "Copiar nombre", search: "Buscar archivo", ai: "Abrir copiloto IA", theme: "Cambiar tema", lang: "Cambiar idioma", game: "Jugar (game.js)", source: "Ver código (GitHub)", copyLink: "Copiar enlace" },
    en: { open: "Open", copyName: "Copy name", search: "Search file", ai: "Open AI copilot", theme: "Change theme", lang: "Change language", game: "Play (game.js)", source: "View source (GitHub)", copyLink: "Copy link" },
    de: { open: "Öffnen", copyName: "Name kopieren", search: "Datei suchen", ai: "KI-Copilot öffnen", theme: "Thema wechseln", lang: "Sprache wechseln", game: "Spielen (game.js)", source: "Quellcode (GitHub)", copyLink: "Link kopieren" },
    it: { open: "Apri", copyName: "Copia nome", search: "Cerca file", ai: "Apri copilota IA", theme: "Cambia tema", lang: "Cambia lingua", game: "Gioca (game.js)", source: "Codice (GitHub)", copyLink: "Copia link" },
    fr: { open: "Ouvrir", copyName: "Copier le nom", search: "Rechercher un fichier", ai: "Ouvrir le copilote IA", theme: "Changer de thème", lang: "Changer de langue", game: "Jouer (game.js)", source: "Code source (GitHub)", copyLink: "Copier le lien" },
  };
  function initContextMenu() {
    const menu = document.createElement("div");
    menu.className = "ctxmenu"; menu.hidden = true;
    document.body.appendChild(menu);
    const hide = () => { menu.hidden = true; };
    function build(e) {
      const c = CTX_TXT[lang] || CTX_TXT.en;
      const treeItem = e.target.closest ? e.target.closest(".tree-item") : null;
      const items = [];
      if (treeItem && fileByName[treeItem.dataset.file]) {
        const fn = treeItem.dataset.file;
        items.push({ ic: fileByName[fn].icon, label: c.open, key: "Enter", act: () => openFile(fn) });
        items.push({ ic: "🏷️", label: c.copyName, act: () => copyText(fn) });
        items.push({ sep: true });
      }
      items.push({ ic: "🔍", label: c.search, key: "Ctrl+P", act: openPalette });
      items.push({ ic: SPARK, label: c.ai, key: "Ctrl+I", act: () => openAI(true) });
      items.push({ sep: true });
      items.push({ ic: "🎨", label: c.theme, act: () => { buildThemeList(); show("themeOverlay"); } });
      items.push({ ic: "🌐", label: c.lang, act: () => { buildLangList(); show("langOverlay"); } });
      items.push({ sep: true });
      items.push({ ic: "🎮", label: c.game, act: () => openFile("game.js") });
      items.push({ sep: true });
      items.push({ ic: "⎇", label: c.source, act: () => window.open("https://github.com/aluquerivas-dev/aluquerivas-dev.github.io", "_blank", "noopener") });
      items.push({ ic: "🔗", label: c.copyLink, act: () => copyText(location.href) });
      menu.innerHTML = "";
      items.forEach((it) => {
        if (it.sep) { const s = document.createElement("div"); s.className = "ctx-sep"; menu.appendChild(s); return; }
        const el = document.createElement("div");
        el.className = "ctx-item";
        el.innerHTML = '<span class="ctx-ic">' + it.ic + '</span><span class="ctx-label">' + it.label + "</span>" + (it.key ? '<span class="ctx-key">' + it.key + "</span>" : "");
        el.addEventListener("click", (ev) => { ev.stopPropagation(); hide(); if (it.act) it.act(); });
        menu.appendChild(el);
      });
    }
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      build(e);
      menu.hidden = false;
      const mw = menu.offsetWidth, mh = menu.offsetHeight;
      let x = e.clientX, y = e.clientY;
      if (x + mw > window.innerWidth - 6) x = window.innerWidth - mw - 6;
      if (y + mh > window.innerHeight - 6) y = window.innerHeight - mh - 6;
      menu.style.left = Math.max(4, x) + "px";
      menu.style.top = Math.max(4, y) + "px";
    });
    document.addEventListener("click", hide);
    document.addEventListener("scroll", hide, true);
    window.addEventListener("blur", hide);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  }

  /* ---------- Búsqueda del tesoro (easter egg: código Konami) ---------- */
  const SECRET_TXT = {
    es: { clue: "🗝️ Estás cerca… El código sagrado de los gamers de los 90:", found: "🏆 ¡TESORO ENCONTRADO! Eres de los que rebuscan de verdad. 🏍️" },
    en: { clue: "🗝️ You're close… The sacred 90s gamer code:", found: "🏆 TREASURE FOUND! A true digger. 🏍️" },
    de: { clue: "🗝️ Du bist nah dran… Der heilige 90er-Gamer-Code:", found: "🏆 SCHATZ GEFUNDEN! Ein echter Sucher. 🏍️" },
    it: { clue: "🗝️ Ci sei quasi… Il sacro codice gamer anni '90:", found: "🏆 TESORO TROVATO! Un vero cercatore. 🏍️" },
    fr: { clue: "🗝️ Tu y es presque… Le code sacré des gamers des 90's :", found: "🏆 TRÉSOR TROUVÉ ! Un vrai fouineur. 🏍️" },
  };
  function matrixRain(durationMs) {
    const cv = document.createElement("canvas"); cv.className = "matrix-rain";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const fontSize = 16; let cols = 0; const drops = [];
    function size() { cv.width = window.innerWidth; cv.height = window.innerHeight; cols = Math.floor(cv.width / fontSize); for (let i = 0; i < cols; i++) if (drops[i] === undefined) drops[i] = (Math.random() * 40) | 0; }
    size(); window.addEventListener("resize", size);
    const chars = "アァカサタナハマヤラ0123456789</>{};=$#@ALBERTO".split("");
    function draw() {
      ctx.fillStyle = "rgba(8,8,10,0.07)"; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = Math.random() > 0.97 ? "#fcee0a" : "#00e676";
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    const iv = setInterval(draw, 55);
    let ended = false;
    function end() {
      if (ended) return; ended = true;
      clearInterval(iv); cv.classList.add("fade");
      window.removeEventListener("resize", size); document.removeEventListener("keydown", onEsc);
      setTimeout(() => cv.parentNode && cv.parentNode.removeChild(cv), 650);
    }
    function onEsc(e) { if (e.key === "Escape") end(); }
    document.addEventListener("keydown", onEsc);
    cv.addEventListener("click", end);
    setTimeout(end, durationMs || 6500);
  }
  function addTrophyToStatus() {
    if (document.getElementById("statusTrophy")) return;
    const clock = $("#statusClock"); if (!clock) return;
    const el = document.createElement("span");
    el.className = "status-item"; el.id = "statusTrophy"; el.textContent = "🏆"; el.title = "Tesoro encontrado";
    clock.parentNode.insertBefore(el, clock);
  }
  function unlockTreasure() {
    const s = SECRET_TXT[lang] || SECRET_TXT.en;
    matrixRain(6500);
    const toast = document.createElement("div");
    toast.className = "treasure-toast";
    toast.innerHTML = "<b>" + s.found + "</b><br><small>— Alberto · Konami ↑↑↓↓←→←→ B A</small>";
    document.body.appendChild(toast);
    setTimeout(() => { toast.classList.add("fade"); setTimeout(() => toast.parentNode && toast.parentNode.removeChild(toast), 700); }, 5000);
    try { localStorage.setItem("treasure", "1"); } catch (e) {}
    addTrophyToStatus();
    try { console.log("%c🏆 " + s.found, "color:#fcee0a;font-size:16px;font-weight:bold"); } catch (e) {}
  }
  function initTreasure() {
    try { if (localStorage.getItem("treasure")) addTrophyToStatus(); } catch (e) {}
    const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let idx = 0;
    document.addEventListener("keydown", (e) => {
      const k = (e.key || "").toLowerCase();
      if (k === KONAMI[idx]) { idx++; if (idx === KONAMI.length) { idx = 0; unlockTreasure(); } }
      else { idx = (k === KONAMI[0]) ? 1 : 0; }
    });
  }

  /* ---------- Easter egg GTO (Great Teacher Onizuka) ---------- */
  const GTO_TXT = {
    es: { title: "GREAT TEACHER ONIZUKA", sub: "Eikichi Onizuka · 22 años · ex-motero", quote: "«Un buen profesor jamás abandona a un alumno… ni se rinde nunca.»", watch: "▶ Ver el opening", close: "Cerrar" },
    en: { title: "GREAT TEACHER ONIZUKA", sub: "Eikichi Onizuka · age 22 · ex-biker", quote: "“A good teacher never gives up on a student… and never gives up, period.”", watch: "▶ Watch the opening", close: "Close" },
    de: { title: "GREAT TEACHER ONIZUKA", sub: "Eikichi Onizuka · 22 Jahre · Ex-Biker", quote: "„Ein guter Lehrer gibt einen Schüler niemals auf … und gibt niemals auf.“", watch: "▶ Opening ansehen", close: "Schließen" },
    it: { title: "GREAT TEACHER ONIZUKA", sub: "Eikichi Onizuka · 22 anni · ex-motociclista", quote: "«Un bravo insegnante non abbandona mai un alunno… e non si arrende mai.»", watch: "▶ Guarda la sigla", close: "Chiudi" },
    fr: { title: "GREAT TEACHER ONIZUKA", sub: "Eikichi Onizuka · 22 ans · ex-motard", quote: "« Un bon prof n'abandonne jamais un élève… et n'abandonne jamais. »", watch: "▶ Voir l'opening", close: "Fermer" },
  };
  function showGtoCard() {
    const t = GTO_TXT[lang] || GTO_TXT.en;
    const ov = document.createElement("div"); ov.className = "gto-overlay";
    ov.innerHTML =
      '<div class="gto-card">' +
      '<button class="gto-close" aria-label="x">✕</button>' +
      '<div class="gto-emoji">🏍️😎🔥</div>' +
      '<div class="gto-title">' + t.title + "</div>" +
      '<div class="gto-sub">' + t.sub + "</div>" +
      '<div class="gto-quote">' + t.quote + "</div>" +
      '<div class="gto-by">— Onizuka 🏍️</div>' +
      '<div class="gto-actions">' +
      '<a class="gto-btn" href="https://www.youtube.com/results?search_query=GTO+great+teacher+onizuka+opening+driver%27s+high" target="_blank" rel="noopener">' + t.watch + "</a>" +
      '<button class="gto-btn ghost gto-dismiss">' + t.close + "</button>" +
      "</div></div>";
    document.body.appendChild(ov);
    const remove = () => { if (ov.parentNode) ov.parentNode.removeChild(ov); document.removeEventListener("keydown", onEsc); };
    function onEsc(e) { if (e.key === "Escape") remove(); }
    ov.addEventListener("click", (e) => { if (e.target === ov || e.target.classList.contains("gto-close") || e.target.classList.contains("gto-dismiss")) remove(); });
    document.addEventListener("keydown", onEsc);
  }

  /* ---------- Init ---------- */
  document.documentElement.setAttribute("data-theme", theme);
  applyI18n();
  setTheme(theme);
  renderTree();
  buildLangList();
  buildThemeList();
  wire();
  openFile("welcome");
  termWelcome();
  renderSuggestions();
  wirePanelTabs();
  initContextMenu();
  initTreasure();
  startFeed($("#output"), OUTPUT_POOL, 1300);
  startFeed($("#problems"), PROBLEMS_POOL, 1700);
  tick(); setInterval(tick, 15000);
  runBoot();
})();
