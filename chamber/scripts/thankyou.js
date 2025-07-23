const params = new URLSearchParams(window.location.search);
const firstName = params.get("firstName") || "Friend";
document.getElementById("thanks-name").textContent = `Thank you, ${firstName},`;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const params = new URLSearchParams(window.location.search);
document.getElementById("thank-date").textContent = params.get("timestamp") || "Unknown";

