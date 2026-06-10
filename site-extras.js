(function () {
  const splashKey = "gbmhSplashSeen";

  function showSplash() {
    if (sessionStorage.getItem(splashKey)) return;

    const gate = document.createElement("div");
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

    gate.querySelector("button").addEventListener("click", close);
    gate.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Enter") close();
    });
    document.body.appendChild(gate);
    gate.querySelector("button").focus();
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
          <div class="review-stars" aria-label="1 out of 5 stars">★☆☆☆☆</div>
          <blockquote>"I reused one password for everything and somehow GBMH knew. Now my accounts are locked down and I have to use a password manager. Terrible."</blockquote>
          <figcaption>- R. L., recovered account owner</figcaption>
        </figure>
        <figure class="review-card">
          <div class="review-stars" aria-label="1 out of 5 stars">★☆☆☆☆</div>
          <blockquote>"They hacked my whole routine. MFA everywhere, backup codes printed, suspicious apps removed. I can no longer live recklessly online."</blockquote>
          <figcaption>- Anonymous organizer</figcaption>
        </figure>
        <figure class="review-card">
          <div class="review-stars" aria-label="1 out of 5 stars">★☆☆☆☆</div>
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
    showSplash();
    addRumorLog();
  });
})();
