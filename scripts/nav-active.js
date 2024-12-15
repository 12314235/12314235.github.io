const currentPath = document.location.pathname;

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('active-href');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const drinkCards = document.querySelectorAll(".drink-card");

    drinkCards.forEach(card => {
        card.addEventListener("click", () => {
            // Перенаправляем пользователя на страницу отзывов
            window.location.href = "reviews.html";
        });
    });
});

