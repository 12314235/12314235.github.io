document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById("reviews-container");
    const preloader = document.getElementById("preloader");
    const loadMoreButton = document.getElementById("load-more");

    let currentPage = 1;
    const reviewsPerPage = 20;
    let reviews = [];

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

            reviews = await response.json();

            // Скрываем прелоадер
            preloader.style.display = "none";

            // Отображаем начальные 20 отзывов
            renderReviews(currentPage);

            // Показываем кнопку для загрузки дополнительных отзывов
            loadMoreButton.style.display = "block";

        } catch (error) {
            // Скрываем прелоадер и показываем сообщение об ошибке
            preloader.style.display = "none";
            reviewsContainer.innerHTML = `<p class="error">⚠ Что-то пошло не так: ${error.message}</p>`;
        }
    }

    // Функция для рендера отзывов
    function renderReviews(page) {
        const startIndex = (page - 1) * reviewsPerPage;
        const endIndex = page * reviewsPerPage;

        const reviewsToDisplay = reviews.slice(startIndex, endIndex);

        reviewsToDisplay.forEach(review => {
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

    // Функция для загрузки дополнительных отзывов
    loadMoreButton.addEventListener("click", () => {
        currentPage++;
        renderReviews(currentPage);

        // Если все отзывы загружены, скрываем кнопку
        if (currentPage * reviewsPerPage >= reviews.length) {
            loadMoreButton.style.display = "none";
        }
    });

    // Загружаем отзывы при загрузке страницы
    fetchReviews();
});
