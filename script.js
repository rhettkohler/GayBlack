const output = document.querySelector("#terminal-output");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");

const commands = {
  help: [
    "available commands:",
    "  help        show this menu",
    "  manifesto   print the operating doctrine",
    "  scan        run a readiness scan",
    "  briefing    show current advisory",
    "  trace       display a local signal trace",
    "  map         list active site nodes",
    "  lab         open the defense lab",
    "  request     open the recovery form",
    "  status      show network status",
    "  clear       wipe this console"
  ].join("\n"),
  manifesto: [
    "GBMH doctrine:",
    "  1. secure the group chat",
    "  2. document the process",
    "  3. protect people before platforms",
    "  4. keep every action lawful, consensual, and accountable"
  ].join("\n"),
  scan: [
    "running readiness scan...",
    "controls checked: backups, MFA, password manager, recovery contacts",
    "findings: 0 critical, 2 recommended improvements",
    "recommendation: rotate shared passwords and verify recovery email access"
  ].join("\n"),
  briefing: [
    "current advisory:",
    "phishing campaigns continue to target community organizers and creators.",
    "verify sender identity out-of-band before opening attachments or sharing codes.",
    "report suspicious login prompts and preserve screenshots for incident review."
  ].join("\n"),
  trace: [
    "trace route:",
    "  visitor -> public gateway -> gbmh.men -> defense lab",
    "regional node: Gallatin, TN",
    "status: browser-local simulation only"
  ].join("\n"),
  map: [
    "active nodes:",
    "  /services.html            recovery and readiness desk",
    "  /field-guide.html         defensive checklists",
    "  /lab.html                 interactive range",
    "  /request-unhacking.html   private intake"
  ].join("\n"),
  status: [
    "network status:",
    "  public site: online",
    "  terminal: local",
    "  lab modules: ready",
    "  credential collection: disabled"
  ].join("\n")
};

function print(text = "") {
  output.textContent += `${text}\n`;
  output.scrollTop = output.scrollHeight;
}

function boot() {
  print("Gay Black Men Hackers console v1.0");
  print("Defense-first operations. Lawful access only.");
  print("Type 'help' and press Enter.");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim().toLowerCase();
  if (!value) return;

  print(`gbmh@localhost:~$ ${value}`);
  input.value = "";

  if (value === "clear") {
    output.textContent = "";
    return;
  }

  if (value === "lab") {
    print("opening defense lab...");
    window.location.href = "lab.html";
    return;
  }

  if (value === "request") {
    print("opening recovery form...");
    window.location.href = "request-unhacking.html";
    return;
  }

  print(commands[value] || `command not found: ${value}. Try 'help' for available commands.`);
});

boot();
