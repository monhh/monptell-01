document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    /* Toggle del menu hamburger */
    hamburger.addEventListener("click", () => {
        navbar.classList.toggle("active");
        /* deshabilitando el desplazamiento vertical del viewport when open menu */
        document.body.classList.toggle("menu-open");
    });

    
    // Filtrar cards según la categoría
    const cards = document.querySelectorAll(".card");

    // función para filtrar las cards
    const filterCards = (category) => {
        cards.forEach((card) => {
            const cardCategory = card
                .querySelector(".category a")
                .textContent.trim()
                .toLowerCase();
            card.style.display =
                category === "all" || cardCategory === category
                    ? "block"
                    : "none";
        });
    };

    // click en las cards (categorías)
    document.querySelectorAll(".category a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Evita la navegación
            const category = link.textContent.trim().toLowerCase();
            filterCards(category);

            // Al filtrar guardamos un estado en el historial
            history.pushState(
                { category: "filtered" },
                "",
                window.location.href
            );
        });
    });


    // Restaurar estado inicial al clickear el logo y cerrar el menú
    const logo = document.querySelector("a.logo");

    logo.addEventListener("click", (e) => {
        e.preventDefault(); // Importante para evitar recarga
        filterCards("all"); // Muestra todas las cards
        history.replaceState({ category: "all" }, "", "/"); // Limpia el historial y la URL

        // Cerrar el menú si está abierto
        const navbar = document.querySelector(".navbar.active"); // Ajusta este selector según tu estructura real
        if (navbar) {
            navbar.classList.remove("active");
        }
        /* deshabilitar la clase "menu-open" */
        document.body.classList.remove("menu-open");
    });


    // Manejar botón de retroceso del navegador
    window.addEventListener("popstate", (e) => {
        // Si el estado es "filtered", restaurar todas las cards
        filterCards(e.state?.category === "filtered" ? "all" : "all");
    });


    // Filtrado con menú de navegación (overlay) y su cierre
        // Selecciona todos los links excepto el que tiene clase 'link' y 'no'
    document.querySelectorAll(".overlay a:not(.link.no)").forEach((navLink) => {
        navLink.addEventListener("click", (e) => {
            e.preventDefault();
            const category = e.target.textContent.trim().toLowerCase();
            filterCards(category);

            // Cerrar el menú overlay
            const navbar = document.querySelector(".navbar.active"); // Asegúrate de que este selector coincida con tu estructura real
            if (navbar) {
                navbar.classList.remove("active");
            }
        });
    });
});
