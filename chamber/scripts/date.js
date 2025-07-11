const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navBar.classList.toggle("open");
});
