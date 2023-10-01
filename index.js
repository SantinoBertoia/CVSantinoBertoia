const iconoButton = document.querySelector(".navbar-icono");
const navbar = document.querySelector(".navbar");

function toggleNavbarLinks() {
    navbar.classList.toggle("active");
}

iconoButton.addEventListener("click", toggleNavbarLinks);