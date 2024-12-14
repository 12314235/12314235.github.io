// Обработка отправки формы
const form = document.getElementById("cart-form");
const cartContainer = document.getElementById("cart-container");
const saveCartButton = document.getElementById("save-cart");
const loadCartButton = document.getElementById("load-cart");

let cart = []; // Массив для хранения элементов корзины

// Функция для отображения корзины
function renderCart() {
    cartContainer.innerHTML = ""; // Очищаем контейнер
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Корзина пуста.</p>";
        return;
    }

    const table = document.createElement("table");
    table.classList.add("cart-table");

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Название</th><th>Количество</th><th>Цена</th><th>Итог</th><th>Удалить</th>";
    table.appendChild(headerRow);

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${(item.quantity * item.price).toFixed(2)}</td>
            <td><button data-index="${index}" class="delete-btn">Удалить</button></td>
        `;

        table.appendChild(row);
    });

    cartContainer.appendChild(table);

    // Добавляем обработчики удаления
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            renderCart();
        });
    });
}

// Обработчик отправки формы
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const itemName = document.getElementById("item-name").value;
    const itemQuantity = parseInt(document.getElementById("item-quantity").value);
    const itemPrice = parseFloat(document.getElementById("item-price").value);

    cart.push({ name: itemName, quantity: itemQuantity, price: itemPrice });
    renderCart();

    form.reset();
});

// Сохранение корзины в LocalStorage
saveCartButton.addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Корзина сохранена!");
});

// Загрузка корзины из LocalStorage
loadCartButton.addEventListener("click", () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
        alert("Корзина загружена!");
    } else {
        alert("Нет сохраненной корзины.");
    }
});

// Инициализация отображения пустой корзины
renderCart();
