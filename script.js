const QUOTE_EMAIL = "quotes@example.com";

const quoteForm = document.querySelector("#quote-form");
const quoteEmailLink = document.querySelector("#quote-email-link");

if (quoteEmailLink) {
  quoteEmailLink.href = `mailto:${QUOTE_EMAIL}`;
  quoteEmailLink.textContent = QUOTE_EMAIL;
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const lines = [
      "Parking lot striping quote request",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Company/property: ${formData.get("company") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Property address: ${formData.get("address") || ""}`,
      `Lot type: ${formData.get("lotType") || ""}`,
      `Preferred timing: ${formData.get("timing") || ""}`,
      "",
      "Scope:",
      formData.get("scope") || "",
      "",
      "Notes/photo links:",
      formData.get("notes") || ""
    ];

    const subject = encodeURIComponent("Parking Lot Striping Quote Request");
    const body = encodeURIComponent(lines.join("\n"));

    window.location.href = `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;
  });
}
