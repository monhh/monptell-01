const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");


/* add or remove the "change" class from the "nav" */
hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    /* deshabilitando el desplazamiento vertical del viewport when open menu */
    document.body.classList.toggle("menu-open");

})

