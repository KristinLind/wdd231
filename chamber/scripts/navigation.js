document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const nav = document.querySelector(".navigation");
  
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("show");
      menuButton.innerHTML = nav.classList.contains("show") ? "&times;" : "&#9776;";
    });
});
  
    

