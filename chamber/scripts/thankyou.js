document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const firstName = params.get("firstName") || "";
    const lastName = params.get("lastName") || "";
    const fullName = `${firstName} ${lastName}`.trim();

    const nameSpan = document.getElementById("thank-you-name");
    if (nameSpan) nameSpan.textContent = fullName;

    const thanksName = document.getElementById("thanks-name");
    if (thanksName) thanksName.textContent = `Thank you, ${firstName}`;
  
    const rawTimestamp = params.get("timestamp");
    const dateSpan = document.getElementById("thank-date");
    if (dateSpan) {
      if (rawTimestamp) {
        const parsedDate = new Date(rawTimestamp);
        dateSpan.textContent = parsedDate.toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "short"
        });
      } else {
        dateSpan.textContent = "Unknown";
      }
    }
    const currentYear = document.getElementById("currentyear");
    if (currentYear) currentYear.textContent = new Date().getFullYear();
  
    const lastModified = document.getElementById("lastModified");
    if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
});
  


