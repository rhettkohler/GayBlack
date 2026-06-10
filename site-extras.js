(function () {
  const splashKey = "gbmhSplashSeen";
  const routes = [
    { label: "Home", detail: "Top of the public network", url: "index.html#top", keys: ["home", "main"] },
    { label: "Operations", detail: "Active areas of work", url: "index.html#ops", keys: ["ops", "operations"] },
    { label: "Services", detail: "Recovery, readiness, privacy, training", url: "services.html", keys: ["services", "support"] },
    { label: "Field Guide", detail: "Fast defensive checklists", url: "field-guide.html", keys: ["guide", "checklist"] },
    { label: "Defense Lab", detail: "Games, drills, and interactive modules", url: "lab.html", keys: ["lab", "games", "range"] },
    { label: "Request Unhacking", detail: "Submit a private recovery request", url: "request-unhacking.html", keys: ["request", "unhacking", "help"] },
    { label: "Console", detail: "Interactive terminal", url: "index.html#terminal", keys: ["terminal", "console"] }
  ];

  function injectFixStyles() {
    if (document.querySelector("#gbmh-live-fix-styles")) return;
    const style = document.createElement("style");
    style.id = "gbmh-live-fix-styles";
    style.textContent = `
      .hero-carousel{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;background:#05060a}.hero-carousel .hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:58% center;opacity:0;transform:scale(1.04);animation:heroPhotoFlip 32s infinite}.hero-carousel .hero-image:nth-child(1){animation-delay:0s}.hero-carousel .hero-image:nth-child(2){animation-delay:6.4s}.hero-carousel .hero-image:nth-child(3){animation-delay:12.8s}.hero-carousel .hero-image:nth-child(4){animation-delay:19.2s}.hero-carousel .hero-image:nth-child(5){animation-delay:25.6s}@keyframes heroPhotoFlip{0%{opacity:0;transform:scale(1.04)}6%,18%{opacity:1}24%,100%{opacity:0;transform:scale(1.12)}}
      .reel-card{color:var(--text);cursor:pointer;text-align:left;font:inherit}.reel-card:hover,.reel-card:focus{border-color:rgba(32,199,255,.72);outline:0}.reel-meter{position:absolute;z-index:2;left:1rem;right:1rem;top:1rem;height:.45rem;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.18)}.reel-meter span{display:block;width:38%;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--cyan),var(--magenta));animation:reelMeter 2.8s ease-in-out infinite alternate}.reel-action{display:inline-flex;width:fit-content;margin-top:.9rem;padding:.55rem .75rem;border:1px solid rgba(255,255,255,.2);border-radius:.4rem;color:#05060a;background:var(--gold);font-size:.82rem;font-weight:900}@keyframes reelMeter{to{width:86%}}
      .clip-player{position:fixed;z-index:1000;inset:0;display:grid;place-items:center;padding:1rem;background:rgba(5,6,10,.78);backdrop-filter:blur(16px)}.clip-player[hidden]{display:none}.clip-panel{width:min(54rem,100%);border:1px solid var(--line);border-radius:.5rem;overflow:hidden;background:#090b10;box-shadow:var(--shadow)}.clip-close{float:right;margin:.9rem;border:1px solid var(--line);border-radius:.4rem;background:#10131d;color:var(--text);padding:.55rem .75rem;font-weight:900}.clip-screen{clear:both;position:relative;min-height:24rem;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 30% 30%,rgba(32,199,255,.38),transparent 10rem),radial-gradient(circle at 75% 62%,rgba(255,47,155,.28),transparent 12rem),linear-gradient(150deg,#10131d,#05060a)}.clip-player[data-accent=pink] .clip-screen{background:radial-gradient(circle at 34% 28%,rgba(255,47,155,.44),transparent 10rem),radial-gradient(circle at 75% 62%,rgba(36,255,146,.2),transparent 12rem),linear-gradient(150deg,#16101a,#05060a)}.clip-player[data-accent=gold] .clip-screen{background:radial-gradient(circle at 32% 26%,rgba(255,210,106,.42),transparent 10rem),radial-gradient(circle at 75% 62%,rgba(32,199,255,.2),transparent 12rem),linear-gradient(150deg,#191407,#05060a)}.clip-gridlines{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:34px 34px;animation:scanSweep 3.8s linear infinite}.clip-frame{position:relative;width:min(38rem,calc(100% - 2rem));padding:clamp(1.25rem,4vw,2rem);border:1px solid var(--line);border-radius:.5rem;background:rgba(5,6,10,.72)}.clip-frame h3{font-size:clamp(1.8rem,5vw,3.5rem);line-height:.95}.clip-frame ol{display:grid;gap:.65rem;margin:1.5rem 0 0;padding-left:1.4rem;color:#ede9f4;line-height:1.5}.clip-controls{display:grid;grid-template-columns:auto 1fr auto;gap:.8rem;align-items:center;padding:1rem;border-top:1px solid var(--line);background:#10131d}.clip-progress{height:.7rem;overflow:hidden;border-radius:999px;background:#05060a}.clip-progress span{display:block;width:0;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--cyan),var(--magenta),var(--gold))}.clip-time{color:var(--green);font-family:SFMono-Regular,Consolas,Liberation Mono,monospace;font-size:.9rem}@keyframes clipProgress{to{width:100%}}
      @media(max-width:850px){.hero-carousel .hero-image{object-position:66% center}.clip-controls{grid-template-columns:1fr}.clip-time{justify-self:start}}
    `;
    document.head.appendChild(style);
  }

  function upgradeHeroCarousel() {
    const hero = document.querySelector(".hero");
    if (!hero || hero.querySelector(".hero-carousel")) return;
    const current = hero.querySelector(".hero-image");
    const scrim = hero.querySelector(".hero-scrim");
    if (!current || !scrim) return;
    const images = [
      { src: current.getAttribute("src"), alt: current.getAttribute("alt") || "" },
      { src: "https://images.pexels.com/photos/6315113/pexels-photo-6315113.jpeg?auto=compress&cs=tinysrgb&w=1800", alt: "Adult Black male couple kissing in a city" },
      { src: "https://images.pexels.com/photos/6315273/pexels-photo-6315273.jpeg?auto=compress&cs=tinysrgb&w=1800", alt: "Adult Black male couple kissing on an illuminated city street" },
      { src: "https://images.pexels.com/photos/6315048/pexels-photo-6315048.jpeg?auto=compress&cs=tinysrgb&w=1800", alt: "Adult Black male couple embracing and kissing near lights" },
      { src: current.getAttribute("src"), alt: current.getAttribute("alt") || "" }
    ];
    const carousel = document.createElement("div");
    carousel.className = "hero-carousel";
    carousel.setAttribute("aria-label", "Rotating GBMH hero photos");
    carousel.innerHTML = images.map((image) => `<img class="hero-image" src="${image.src}" alt="${image.alt}">`).join("");
    current.remove();
    hero.insertBefore(carousel, scrim);
  }

  function showSplash() {
    if (sessionStorage.getItem(splashKey)) return;
    const gate = document.createElement("div");
    let advanced = false;
    gate.className = "splash-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "splash-title");
    gate.innerHTML = `<div class="splash-dialog"><p class="eyebrow">Secure channel established</p><h2 id="splash-title">Hello Robert Lockwood</h2><p>Proceed to the public GBMH network.</p><button class="button primary" type="button">Continue</button></div>`;
    const close = () => { sessionStorage.setItem(splashKey, "true"); gate.remove(); };
    const showRegionalDialogue = () => {
      advanced = true;
      gate.querySelector(".splash-dialog").innerHTML = `<p class="eyebrow">Route trace complete</p><h2 id="splash-title">Regional node: Gallatin, TN</h2><p>I hope you had a nice trip and welcome home.</p><button class="button primary" type="button">Enter Site</button>`;
      gate.querySelector("button").addEventListener("click", close);
      gate.querySelector("button").focus();
    };
    gate.querySelector("button").addEventListener("click", showRegionalDialogue);
    gate.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
      if (event.key === "Enter") advanced ? close() : showRegionalDialogue();
    });
    document.body.appendChild(gate);
    gate.querySelector("button").focus();
  }

  function addPageVisuals() {
    const path = window.location.pathname;
    const hero = document.querySelector(".page-hero");
    const configs = [
      { match: "services.html", heroClass: "services-hero", kicker: "Incident room", title: "Calm response when the situation is loud.", copy: "GBMH approaches every request with clear scope, documented steps, and practical recovery guidance. The goal is to reduce panic, preserve evidence, and get people back into safer control.", image: "assets/services-team.svg", alt: "Cybersecurity team reviewing incident response dashboards" },
      { match: "field-guide.html", heroClass: "guide-hero", kicker: "Preparation desk", title: "Security gets easier when the checklist is visible.", copy: "Keep recovery paths, backups, MFA, and device updates organized before a crisis. Small habits compound into real resilience when something breaks.", image: "assets/field-guide-desk.svg", alt: "Desk with laptop, phone, security key, backup drive, and recovery checklist", reverse: true },
      { match: "request-unhacking.html", heroClass: "request-hero", kicker: "Private intake", title: "Tell us what happened without exposing secrets.", copy: "The form is designed for triage, not credential collection. Share timing, affected platforms, and what you have already tried so the next step can be scoped safely.", image: "assets/request-intake.svg", alt: "Cybersecurity responder reviewing a private recovery intake request" },
      { match: "thank-you.html", heroClass: "request-hero" }
    ];
    const config = configs.find((item) => path.endsWith(item.match));
    if (hero && config && config.heroClass) hero.classList.add(config.heroClass);
    if (config && config.image && !document.querySelector(".image-feature")) {
      const feature = document.createElement("section");
      feature.className = `image-feature${config.reverse ? " reverse" : ""}`;
      feature.innerHTML = `<div class="feature-copy"><p class="section-kicker">${config.kicker}</p><h2>${config.title}</h2><p>${config.copy}</p></div><img src="${config.image}" alt="${config.alt}">`;
      hero.parentNode.insertBefore(feature, hero.nextElementSibling);
    }
    const intro = document.querySelector(".intro");
    const isHome = path.endsWith("/") || path.endsWith("/GayBlack") || path.endsWith("index.html") || path === "/";
    if (isHome && intro && !document.querySelector(".home-visual-feature")) {
      const feature = document.createElement("section");
      feature.className = "image-feature reverse home-visual-feature";
      feature.innerHTML = `<div class="feature-copy"><p class="section-kicker">Live response room</p><h2>Built for recovery, readiness, and calm execution.</h2><p>The collective works across account recovery, privacy hardening, organizer infrastructure, and practical training for people who need security to be usable under pressure.</p></div><img src="assets/services-team.svg" alt="Cybersecurity collective reviewing dashboards in a response room">`;
      intro.parentNode.insertBefore(feature, intro.nextElementSibling);
    }
  }

  function syncNavigation() {
    document.querySelectorAll("nav[aria-label='Main navigation']").forEach((nav) => {
      if (!nav.querySelector('a[href="lab.html"]')) {
        const guide = nav.querySelector('a[href="field-guide.html"]');
        const labLink = document.createElement("a");
        labLink.href = "lab.html";
        labLink.textContent = "Defense Lab";
        if (guide) guide.insertAdjacentElement("afterend", labLink);
        else nav.appendChild(labLink);
      }
    });
    const optionList = document.querySelector(".option-list");
    if (optionList && !optionList.querySelector('a[href="lab.html"]')) {
      const item = document.createElement("a");
      item.href = "lab.html";
      item.innerHTML = `<span>04</span><strong>Enter the Defense Lab</strong><p>Play quick security drills, unlock local-only interactions, and practice response decisions.</p>`;
      optionList.appendChild(item);
    }
  }

  function addSignalReels() {
    if (document.querySelector(".reel-band")) return;
    const footer = document.querySelector("footer");
    const section = document.createElement("section");
    section.className = "reel-band";
    section.setAttribute("aria-labelledby", "reel-title");
    section.innerHTML = `<div class="section-heading"><p class="section-kicker">Signal reels</p><h2 id="reel-title">Playable field notes from the recovery desk.</h2><p class="review-note">Click a clip to open a short browser-built field reel. These are stylized composites based on defensive security moments, not real client footage.</p></div><div class="reel-grid"><button class="reel-card reel-blue" type="button" data-clip="recovery"><div class="reel-scan"></div><div class="reel-meter" aria-hidden="true"><span></span></div><div class="reel-content"><p class="section-kicker">00:17 / Account recovery</p><h3>Session sweep complete</h3><p>Unknown sessions removed, MFA reset, backup codes archived offline.</p><span class="reel-action">Play clip</span></div></button><button class="reel-card reel-pink" type="button" data-clip="infra"><div class="reel-scan"></div><div class="reel-meter" aria-hidden="true"><span></span></div><div class="reel-content"><p class="section-kicker">00:31 / Organizer infra</p><h3>Access map stabilized</h3><p>Shared drive permissions reduced to named owners and documented roles.</p><span class="reel-action">Play clip</span></div></button><button class="reel-card reel-gold" type="button" data-clip="phishing"><div class="reel-scan"></div><div class="reel-meter" aria-hidden="true"><span></span></div><div class="reel-content"><p class="section-kicker">00:44 / Phishing triage</p><h3>Attachment held</h3><p>Sender verified out-of-band before anyone clicked the bait.</p><span class="reel-action">Play clip</span></div></button></div>`;
    if (footer) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);
  }

  function addClipPlayer() {
    if (document.querySelector(".clip-player")) return;
    const clips = {
      recovery: { title: "Session sweep complete", steps: ["Verify recovery email", "Remove unknown sessions", "Rotate password", "Archive backup codes"], accent: "cyan" },
      infra: { title: "Access map stabilized", steps: ["Inventory shared folders", "Name real owners", "Drop stale editors", "Document the handoff"], accent: "pink" },
      phishing: { title: "Attachment held", steps: ["Pause the click", "Check sender context", "Verify out-of-band", "Report and preserve"], accent: "gold" }
    };
    const player = document.createElement("div");
    player.className = "clip-player";
    player.hidden = true;
    player.setAttribute("role", "dialog");
    player.setAttribute("aria-modal", "true");
    player.innerHTML = `<div class="clip-panel"><button class="clip-close" type="button" aria-label="Close clip">Close</button><div class="clip-screen"><div class="clip-gridlines"></div><div class="clip-frame"><p class="section-kicker">Now playing</p><h3></h3><ol></ol></div></div><div class="clip-controls"><button class="mini-button clip-restart" type="button">Replay</button><div class="clip-progress" aria-hidden="true"><span></span></div><span class="clip-time">00:00</span></div></div>`;
    const title = player.querySelector("h3");
    const list = player.querySelector("ol");
    const progress = player.querySelector(".clip-progress span");
    const time = player.querySelector(".clip-time");
    let activeClip = clips.recovery;
    let timer = 0;
    const render = (clip) => {
      activeClip = clip;
      player.dataset.accent = clip.accent;
      title.textContent = clip.title;
      list.innerHTML = clip.steps.map((step) => `<li>${step}</li>`).join("");
      progress.style.animation = "none";
      progress.offsetHeight;
      progress.style.animation = "clipProgress 5.2s linear forwards";
      time.textContent = "00:05";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { time.textContent = "complete"; }, 5200);
    };
    const close = () => { player.hidden = true; window.clearTimeout(timer); };
    document.addEventListener("click", (event) => {
      const card = event.target.closest("[data-clip]");
      if (!card) return;
      render(clips[card.dataset.clip]);
      player.hidden = false;
      player.querySelector(".clip-close").focus();
    });
    player.querySelector(".clip-close").addEventListener("click", close);
    player.querySelector(".clip-restart").addEventListener("click", () => render(activeClip));
    player.addEventListener("click", (event) => { if (event.target === player) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !player.hidden) close(); });
    document.body.appendChild(player);
  }

  function addRumorLog() {
    if (document.querySelector(".review-band")) return;
    const footer = document.querySelector("footer");
    const section = document.createElement("section");
    section.className = "review-band";
    section.setAttribute("aria-labelledby", "rumor-log-title");
    section.innerHTML = `<div class="section-heading"><p class="section-kicker">Public rumor log</p><h2 id="rumor-log-title">One-star reports from people who say GBMH got them.</h2><p class="review-note">Unverified public complaints, preserved as street-level signal. These are not customer testimonials or confirmed incident records.</p></div><div class="review-grid"><figure class="review-card"><div class="review-stars" aria-label="1 out of 5 stars">1/5</div><blockquote>"I reused one password for everything and somehow GBMH knew. Now my accounts are locked down and I have to use a password manager. Terrible."</blockquote><figcaption>- R. L., recovered account owner</figcaption></figure><figure class="review-card"><div class="review-stars" aria-label="1 out of 5 stars">1/5</div><blockquote>"They hacked my whole routine. MFA everywhere, backup codes printed, suspicious apps removed. I can no longer live recklessly online."</blockquote><figcaption>- Anonymous organizer</figcaption></figure><figure class="review-card"><div class="review-stars" aria-label="1 out of 5 stars">1/5</div><blockquote>"I clicked Request Unhacking and they made me explain what happened without sending my passwords. Extremely inconvenient and probably correct."</blockquote><figcaption>- Verified complainer</figcaption></figure></div>`;
    if (footer) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);
  }

  function addCommandPalette() {
    if (document.querySelector(".quick-access")) return;
    const quick = document.createElement("div");
    quick.className = "quick-access";
    quick.innerHTML = `<button class="palette-toggle" type="button" aria-label="Open command palette">K</button><a href="lab.html" aria-label="Open Defense Lab">LAB</a>`;
    const palette = document.createElement("div");
    palette.className = "palette";
    palette.hidden = true;
    palette.setAttribute("role", "dialog");
    palette.setAttribute("aria-modal", "true");
    palette.setAttribute("aria-labelledby", "palette-title");
    palette.innerHTML = `<div class="palette-panel"><label class="visually-hidden" for="palette-input" id="palette-title">Command palette</label><input id="palette-input" autocomplete="off" spellcheck="false" placeholder="Type a command or destination"><div class="palette-results" role="listbox"></div></div>`;
    const input = palette.querySelector("input");
    const results = palette.querySelector(".palette-results");
    const render = () => {
      const query = input.value.trim().toLowerCase();
      const visible = routes.filter((route) => [route.label, route.detail, ...route.keys].join(" ").toLowerCase().includes(query));
      results.innerHTML = visible.map((route) => `<a href="${route.url}" role="option"><strong>${route.label}</strong><span>${route.detail}</span></a>`).join("") || `<div class="palette-result"><strong>Run local status</strong><span>Try: lab, terminal, request, services, guide</span></div>`;
    };
    const open = () => { palette.hidden = false; input.value = ""; render(); input.focus(); };
    const close = () => { palette.hidden = true; quick.querySelector("button").focus(); };
    quick.querySelector("button").addEventListener("click", open);
    input.addEventListener("input", render);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
      if (event.key === "Enter") {
        const first = results.querySelector("a");
        if (first) window.location.href = first.href;
      }
    });
    palette.addEventListener("click", (event) => { if (event.target === palette) close(); });
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    });
    document.body.appendChild(quick);
    document.body.appendChild(palette);
  }

  function initLab() {
    const phishPrompt = document.querySelector("#phish-prompt");
    if (!phishPrompt) return;
    const messages = [
      { text: "Your email storage is full. Sign in through this shortened link to keep your inbox.", answer: "phish", why: "Shortened link plus pressure to sign in is a classic credential trap." },
      { text: "I moved our meeting notes into the shared drive folder we already use.", answer: "safe", why: "Known context and no demand for codes, passwords, or urgent payment." },
      { text: "Security alert: send your MFA code here so we can cancel the suspicious login.", answer: "phish", why: "Nobody legitimate should ask for an MFA code in chat." }
    ];
    let phishIndex = 0;
    let phishScore = 0;
    const phishOutput = document.querySelector("#phish-output");
    const loadPhish = () => { phishPrompt.textContent = messages[phishIndex % messages.length].text; };
    document.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = messages[phishIndex % messages.length];
        const correct = button.dataset.answer === item.answer;
        if (correct) phishScore += 1;
        phishOutput.textContent = `${correct ? "Correct" : "Review it again"}: ${item.why} Score ${phishScore}/${phishIndex + 1}`;
        phishIndex += 1;
        window.setTimeout(loadPhish, 900);
      });
    });
    loadPhish();
    const password = document.querySelector("#password-lab");
    const passwordBar = document.querySelector("#password-bar");
    const passwordOutput = document.querySelector("#password-output");
    if (password) password.addEventListener("input", () => {
      const value = password.value;
      let score = Math.min(value.length * 7, 42);
      if (/[A-Z]/.test(value)) score += 15;
      if (/[0-9]/.test(value)) score += 15;
      if (/[^A-Za-z0-9]/.test(value)) score += 18;
      if (value.length >= 16) score += 20;
      score = Math.min(score, 100);
      passwordBar.style.width = `${score}%`;
      passwordOutput.textContent = score > 80 ? "Strong pattern. A long passphrase stored in a manager is even better." : score > 48 ? "Getting warmer. Add length and uniqueness." : "Too guessable. Do not reuse short passwords.";
    });
    document.querySelectorAll("[data-incident]").forEach((button) => {
      button.addEventListener("click", () => {
        const output = document.querySelector("#incident-output");
        const responses = { panic: "Bad first move. Public posting can spread sensitive details before facts are clear.", preserve: "Correct. Preserve evidence, secure accounts, then escalate through known channels.", ignore: "Risky. Suspicious login alerts should be reviewed while logs are still fresh." };
        output.textContent = responses[button.dataset.incident];
      });
    });
    const cipherButton = document.querySelector("#cipher-button");
    if (cipherButton) cipherButton.addEventListener("click", () => {
      const value = document.querySelector("#cipher-input").value.trim().toLowerCase();
      const output = document.querySelector("#cipher-output");
      output.textContent = value === "mfa" || value === "multi-factor authentication" ? "Protocol unlocked: verify identity out-of-band before approving access." : "Still locked. The three-letter control stops stolen passwords from becoming stolen accounts.";
    });
    const map = document.querySelector("#node-map");
    if (map && !map.children.length) {
      const nodes = [[14, 22], [30, 68], [46, 38], [62, 76], [78, 28], [88, 58], [54, 14]];
      map.innerHTML = nodes.map(([left, top], index) => `<span class="node" style="left:${left}%;top:${top}%;animation-delay:-${index * 0.32}s"></span>`).join("");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectFixStyles();
    upgradeHeroCarousel();
    syncNavigation();
    addPageVisuals();
    addSignalReels();
    addClipPlayer();
    showSplash();
    addRumorLog();
    addCommandPalette();
    initLab();
  });
})();
