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

  print(commands[value] || `command not found: ${value}. Try 'help' for available commands.`);
});

boot();
