document.addEventListener("DOMContentLoaded", () => {
    // Elementos
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.card');
    const logo = document.querySelector('.logo');
    
    // Toggle menú
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Función de filtrado
    function filterCards(category) {
        cards.forEach(card => {
            const cardCategory = card.querySelector('.category a').textContent.toLowerCase().trim();
            card.style.display = category === 'all' || cardCategory === category ? 'block' : 'none';
        });
    }

    // Manejar clicks en enlaces
    document.querySelectorAll('.overlay a:not(.no), .category a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const category = e.target.textContent.toLowerCase().trim();
            filterCards(category);
            navbar.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Resetear al hacer click en logo
    logo.addEventListener('click', e => {
        e.preventDefault();
        filterCards('all');
        navbar.classList.remove('active');
        document.body.classList.remove('menu-open');
        history.replaceState(null, '', '/');
    });

    // Manejar historial
    window.addEventListener('popstate', () => filterCards('all'));
});