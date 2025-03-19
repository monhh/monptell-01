const menuIcon = document.querySelector(".header__menu-icon");
const navbar = document.querySelector(".navbar");


/* add or remove the "change" class from the "nav" */
menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("overlay-nav--active");
    /* deshabilitando el desplazamiento vertical del viewport when open menu */
    document.body.classList.toggle("menu-open");

})

