const navbutton = document.querySelector('.hamburger');
const navlinks = document.querySelector('#nav-bar');

if (navbutton && navlinks) {
    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navlinks.classList.toggle('show');
    });
}
