const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector("#nav-bar");

menuButton.addEventListener("click", () => {
  navBar.classList.toggle("open");
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;