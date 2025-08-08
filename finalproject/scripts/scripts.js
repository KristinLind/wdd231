localStorage.setItem("lastVisit", new Date().toLocaleString());

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.querySelector("nav ul");
  
    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        hamburgerBtn.classList.toggle("open");
      });
    }
});
  
