document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const logo = document.querySelector("a.logo"); // Selecciona logo

    // Función para filtrar
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

    // Evento click en los enlaces de categoría
    document.querySelectorAll(".category a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Evita la navegación
            const category = link.textContent.trim().toLowerCase();
            filterCards(category);

            // Opcional: Actualizar la URL sin recargar
            /* history.pushState({}, "", `?category=${category}`); */

            // Al filtrar guardamos un estado en el historial
            history.pushState(
                { category: "filtered" },
                "",
                window.location.href
            );
        });
    });

    // Click en el logo - Restaurar estado inicial
    logo.addEventListener("click", (e) => {
        e.preventDefault(); // Importante para evitar recarga
        filterCards("all"); // Muestra todas las cards
        history.replaceState({ category: "all" }, "", "/"); // Limpia el historial y la URL

        // Cerrar el menú si está abierto
        const navbar = document.querySelector(".navbar.active"); // Ajusta este selector según tu estructura real
        if (navbar) {
            navbar.classList.remove("active");
        }
    });

    // Manejar botón de retroceso
    window.addEventListener("popstate", (e) => {
        // Si venimos de un filtrado, restauramos a 'all'
        // Si el estado es "filtered", restaurar todas las cards
        filterCards(e.state?.category === "filtered" ? "all" : "all");
    });

    // Filtrado desde el menú de navegación
    //Selección de enlaces del menú:
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
                // selecciona el body y se le quita la clase "menu-open"
                document.body.classList.toggle("menu-open");
            }
            
        });
    });

});
