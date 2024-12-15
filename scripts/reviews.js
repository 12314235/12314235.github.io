document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById("reviews-container");
    const preloader = document.getElementById("preloader");
    const loadMoreButton = document.getElementById("load-more");

    let currentPage = 1;
    const reviewsPerPage = 20;
    let reviews = [];

    async function fetchReviews() {
        try {
            preloader.style.display = "block";

            const response = await fetch(`https://jsonplaceholder.typicode.com/comments${20}`);

            if (!response.ok) {
                throw new Error("Ошибка при загрузке отзывов");
            }

            reviews = await response.json();

            preloader.style.display = "none";

            renderReviews(currentPage);

            loadMoreButton.style.display = "block";

        } catch (error) {
            preloader.style.display = "none";
            reviewsContainer.innerHTML = `<p class="error">⚠ Что-то пошло не так: ${error.message}</p>`;
        }
    }

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

    loadMoreButton.addEventListener("click", () => {
        currentPage++;
        renderReviews(currentPage);

        if (currentPage * reviewsPerPage >= reviews.length) {
            loadMoreButton.style.display = "none";
        }
    });

    fetchReviews();
});
