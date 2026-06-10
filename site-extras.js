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

  function showSplash() {
    if (sessionStorage.getItem(splashKey)) return;
    const gate = document.createElement("div");
    let advanced = false;
    gate.className = "splash-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "splash-title");
    gate.innerHTML = `
      <div class="splash-dialog">
        <p class="eyebrow">Secure channel established</p>
        <h2 id="splash-title">Hello Robert Lockwood</h2>
        <p>Proceed to the public GBMH network.</p>
        <button class="button primary" type="button">Continue</button>
      </div>
    `;
    const close = () => {
      sessionStorage.setItem(splashKey, "true");
      gate.remove();
    };
    const showRegionalDialogue = () => {
      advanced = true;
      gate.querySelector(".splash-dialog").innerHTML = `
        <p class="eyebrow">Route trace complete</p>
        <h2 id="splash-title">Regional node: Gallatin, TN</h2>
        <p>I hope you had a nice trip and welcome home.</p>
        <button class="button primary" type="button">Enter Site</button>
      `;
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
      feature.innerHTML = `
        <div class="feature-copy">
          <p class="section-kicker">${config.kicker}</p>
          <h2>${config.title}</h2>
          <p>${config.copy}</p>
        </div>
        <img src="${config.image}" alt="${config.alt}">
      `;
      hero.parentNode.insertBefore(feature, hero.nextElementSibling);
    }
    const intro = document.querySelector(".intro");
    const isHome = path.endsWith("/") || path.endsWith("/GayBlack") || path.endsWith("index.html") || path === "/";
    if (isHome && intro && !document.querySelector(".home-visual-feature")) {
      const feature = document.createElement("section");
      feature.className = "image-feature reverse home-visual-feature";
      feature.innerHTML = `
        <div class="feature-copy">
          <p class="section-kicker">Live response room</p>
          <h2>Built for recovery, readiness, and calm execution.</h2>
          <p>The collective works across account recovery, privacy hardening, organizer infrastructure, and practical training for people who need security to be usable under pressure.</p>
        </div>
        <img src="assets/services-team.svg" alt="Cybersecurity collective reviewing dashboards in a response room">
      `;
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
    section.innerHTML = `
      <div class="section-heading">
        <p class="section-kicker">Signal reels</p>
        <h2 id="reel-title">Animated field notes from the recovery desk.</h2>
        <p class="review-note">Stylized, generated scenes based on common defensive security moments. They are cinematic composites, not real client footage.</p>
      </div>
      <div class="reel-grid">
        <article class="reel-card reel-blue" tabindex="0"><span class="play-dot" aria-hidden="true">PLAY</span><div class="reel-scan"></div><div class="reel-content"><p class="section-kicker">00:17 / Account recovery</p><h3>Session sweep complete</h3><p>Unknown sessions removed, MFA reset, backup codes archived offline.</p></div></article>
        <article class="reel-card reel-pink" tabindex="0"><span class="play-dot" aria-hidden="true">PLAY</span><div class="reel-scan"></div><div class="reel-content"><p class="section-kicker">00:31 / Organizer infra</p><h3>Access map stabilized</h3><p>Shared drive permissions reduced to named owners and documented roles.</p></div></article>
        <article class="reel-card reel-gold" tabindex="0"><span class="play-dot" aria-hidden="true">PLAY</span><div class="reel-scan"></div><div class="reel-content"><p class="section-kicker">00:44 / Phishing triage</p><h3>Attachment held</h3><p>Sender verified out-of-band before anyone clicked the bait.</p></div></article>
      </div>
    `;
    if (footer) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);
  }

  function addRumorLog() {
    if (document.querySelector(".review-band")) return;
    const footer = document.querySelector("footer");
    const section = document.createElement("section");
    section.className = "review-band";
    section.setAttribute("aria-labelledby", "rumor-log-title");
    section.innerHTML = `
      <div class="section-heading"><p class="section-kicker">Public rumor log</p><h2 id="rumor-log-title">One-star reports from people who say GBMH got them.</h2><p class="review-note">Unverified public complaints, preserved as street-level signal. These are not customer testimonials or confirmed incident records.</p></div>
      <div class="review-grid">
        <figure class="review-card"><div class="review-stars" aria-label="1 out of 5 stars">1/5</div><blockquote>"I reused one password for everything and somehow GBMH knew. Now my accounts are locked down and I have to use a password manager. Terrible."</blockquote><figcaption>- R. L., recovered account owner</figcaption></figure>
        <figure class="review-card"><div class="review-stars" aria-label="1 out of 5 stars">1/5</div><blockquote>"They hacked my whole routine. MFA everywhere, backup codes printed, suspicious apps removed. I can no longer live recklessly online."</blockquote><figcaption>- Anonymous organizer</figcaption></figure>
        <figure class="review-card"><div class="review-stars" aria-label="1 out of 5 stars">1/5</div><blockquote>"I clicked Request Unhacking and they made me explain what happened without sending my passwords. Extremely inconvenient and probably correct."</blockquote><figcaption>- Verified complainer</figcaption></figure>
      </div>`;
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
        const responses = {
          panic: "Bad first move. Public posting can spread sensitive details before facts are clear.",
          preserve: "Correct. Preserve evidence, secure accounts, then escalate through known channels.",
          ignore: "Risky. Suspicious login alerts should be reviewed while logs are still fresh."
        };
        output.textContent = responses[button.dataset.incident];
      });
    });
    const cipherButton = document.querySelector("#cipher-button");
    if (cipherButton) cipherButton.addEventListener("click", () => {
      const value = document.querySelector("#cipher-input").value.trim().toLowerCase();
      const output = document.querySelector("#cipher-output");
      output.textContent = value === "mfa" || value === "multi-factor authentication"
        ? "Protocol unlocked: verify identity out-of-band before approving access."
        : "Still locked. The three-letter control stops stolen passwords from becoming stolen accounts.";
    });
    const map = document.querySelector("#node-map");
    if (map && !map.children.length) {
      const nodes = [[14, 22], [30, 68], [46, 38], [62, 76], [78, 28], [88, 58], [54, 14]];
      map.innerHTML = nodes.map(([left, top], index) => `<span class="node" style="left:${left}%;top:${top}%;animation-delay:-${index * 0.32}s"></span>`).join("");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncNavigation();
    addPageVisuals();
    addSignalReels();
    showSplash();
    addRumorLog();
    addCommandPalette();
    initLab();
  });
})();
