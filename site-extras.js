(function () {
  const splashKey = "gbmhSplashSeen";

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
      if (event.key === "Enter") {
        if (advanced) close();
        else showRegionalDialogue();
      }
    });
    document.body.appendChild(gate);
    gate.querySelector("button").focus();
  }

  function addPageVisuals() {
    const path = window.location.pathname;
    const hero = document.querySelector(".page-hero");
    const configs = [
      {
        match: "services.html",
        heroClass: "services-hero",
        kicker: "Incident room",
        title: "Calm response when the situation is loud.",
        copy: "GBMH approaches every request with clear scope, documented steps, and practical recovery guidance. The goal is to reduce panic, preserve evidence, and get people back into safer control.",
        image: "assets/services-team.svg",
        alt: "Cybersecurity team reviewing incident response dashboards"
      },
      {
        match: "field-guide.html",
        heroClass: "guide-hero",
        kicker: "Preparation desk",
        title: "Security gets easier when the checklist is visible.",
        copy: "Keep recovery paths, backups, MFA, and device updates organized before a crisis. Small habits compound into real resilience when something breaks.",
        image: "assets/field-guide-desk.svg",
        alt: "Desk with laptop, phone, security key, backup drive, and recovery checklist",
        reverse: true
      },
      {
        match: "request-unhacking.html",
        heroClass: "request-hero",
        kicker: "Private intake",
        title: "Tell us what happened without exposing secrets.",
        copy: "The form is designed for triage, not credential collection. Share timing, affected platforms, and what you have already tried so the next step can be scoped safely.",
        image: "assets/request-intake.svg",
        alt: "Cybersecurity responder reviewing a private recovery intake request"
      },
      {
        match: "thank-you.html",
        heroClass: "request-hero"
      }
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

  function addRumorLog() {
    if (document.querySelector(".review-band")) return;

    const footer = document.querySelector("footer");
    const section = document.createElement("section");
    section.className = "review-band";
    section.setAttribute("aria-labelledby", "rumor-log-title");
    section.innerHTML = `
      <div class="section-heading">
        <p class="section-kicker">Public rumor log</p>
        <h2 id="rumor-log-title">One-star reports from people who say GBMH got them.</h2>
        <p class="review-note">Unverified public complaints, preserved as street-level signal. These are not customer testimonials or confirmed incident records.</p>
      </div>
      <div class="review-grid">
        <figure class="review-card">
          <div class="review-stars" aria-label="1 out of 5 stars">1/5</div>
          <blockquote>"I reused one password for everything and somehow GBMH knew. Now my accounts are locked down and I have to use a password manager. Terrible."</blockquote>
          <figcaption>- R. L., recovered account owner</figcaption>
        </figure>
        <figure class="review-card">
          <div class="review-stars" aria-label="1 out of 5 stars">1/5</div>
          <blockquote>"They hacked my whole routine. MFA everywhere, backup codes printed, suspicious apps removed. I can no longer live recklessly online."</blockquote>
          <figcaption>- Anonymous organizer</figcaption>
        </figure>
        <figure class="review-card">
          <div class="review-stars" aria-label="1 out of 5 stars">1/5</div>
          <blockquote>"I clicked Request Unhacking and they made me explain what happened without sending my passwords. Extremely inconvenient and probably correct."</blockquote>
          <figcaption>- Verified complainer</figcaption>
        </figure>
      </div>
    `;

    if (footer) {
      footer.parentNode.insertBefore(section, footer);
      return;
    }

    document.body.appendChild(section);
  }

  document.addEventListener("DOMContentLoaded", () => {
    addPageVisuals();
    showSplash();
    addRumorLog();
  });
})();
