document.addEventListener("DOMContentLoaded", () => {
    // Elementos principales
    const elements = {
        hamburger: document.querySelector(".hamburger"),
        navbar: document.querySelector(".navbar"),
        cards: document.querySelectorAll(".card"),
        logo: document.querySelector(".logo"),
        navLinks: document.querySelectorAll(".overlay a:not(.no), .category a"),
    };

    // Toggle menú
    elements.hamburger.addEventListener("click", () => {
        elements.navbar.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    // Función de filtrado
    const filterCards = (category) => {
        elements.cards.forEach((card) => {
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

    // Manejo de eventos
    const handleNavigation = (e) => {
        e.preventDefault();
        const category = e.target.textContent.trim().toLowerCase();

        filterCards(category);
        elements.navbar?.classList.remove("active");
        document.body.classList.remove("menu-open");

        history.pushState(
            { category },
            "",
            category === "all" ? "/" : `#${category}`
        );
    };

    // Event listeners
    elements.navLinks.forEach((link) =>
        link.addEventListener("click", handleNavigation)
    );

    elements.logo.addEventListener("click", (e) => {
        e.preventDefault();
        filterCards("all");
        history.replaceState(null, "", "/");
        elements.navbar?.classList.remove("active");
        document.body.classList.remove("menu-open");
    });

    // Manejo del historial
    window.addEventListener("popstate", () =>
        filterCards(history.state?.category || "all")
    );
});
