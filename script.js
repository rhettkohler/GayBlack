const output = document.querySelector("#terminal-output");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");

const commands = {
  help: [
    "available commands:",
    "  help        show this menu",
    "  manifesto   print the official fake doctrine",
    "  scan        run a harmless vibe scan",
    "  brunch      decrypt the reservation status",
    "  clear       wipe this prop terminal"
  ].join("\n"),
  manifesto: [
    "GBMH doctrine:",
    "  1. secure the group chat",
    "  2. document the process",
    "  3. hydrate before incident response",
    "  4. never deploy in a panic outfit"
  ].join("\n"),
  scan: [
    "running vibe scan...",
    "ports checked: kindness, competence, audacity",
    "findings: 0 critical, 2 fabulous, 1 calendar conflict",
    "recommendation: enable MFA and mind your business"
  ].join("\n"),
  brunch: [
    "decrypting brunch.enc...",
    "party size: 8-ish",
    "reservation confidence: medium",
    "threat actor: the person who said 'maybe' again"
  ].join("\n")
};

function print(text = "") {
  output.textContent += `${text}\n`;
  output.scrollTop = output.scrollHeight;
}

function boot() {
  print("Gay Black Men Hackers spoof terminal v1.0");
  print("No networks were harmed in the making of this interface.");
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

  print(commands[value] || `command not found: ${value}. This is satire, not Kali Linux.`);
});

boot();
