const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");


/* add or remove the "change" class from the "nav" */
menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("change");
    /* deshabilitando el desplazamiento vertical del viewport when open menu */
    document.body.classList.toggle("menu-open");

})

