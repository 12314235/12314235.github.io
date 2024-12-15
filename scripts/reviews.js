document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById("reviews-container");
    const preloader = document.getElementById("preloader");

    // Функция для загрузки отзывов
    async function fetchReviews() {
        try {
            // Показываем прелоадер
            preloader.style.display = "block";

            // Генерируем случайное условие (id > 100 или id <= 100)
            const randomFilter = Math.random() > 0.5 ? "?id_gte=100" : "?id_lte=100";
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments${randomFilter}`);

            if (!response.ok) {
                throw new Error("Ошибка при загрузке отзывов");
            }

            const reviews = await response.json();

            // Скрываем прелоадер
            preloader.style.display = "none";

            // Отображаем отзывы
            renderReviews(reviews);
        } catch (error) {
            // Скрываем прелоадер и показываем сообщение об ошибке
            preloader.style.display = "none";
            reviewsContainer.innerHTML = `<p class=\"error\">⚠ Что-то пошло не так: ${error.message}</p>`;
        }
    }

    // Функция для рендера отзывов
    function renderReviews(reviews) {
        reviewsContainer.innerHTML = ""; // Очищаем контейнер

        if (reviews.length === 0) {
            reviewsContainer.innerHTML = "<p>Отзывы не найдены.</p>";
            return;
        }

        reviews.forEach(review => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review-card");

            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <p><strong>Email:</strong> ${review.email}</p>
                <p>${review.body}</p>
            `;

            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Загружаем отзывы при загрузке страницы
    fetchReviews();
});
