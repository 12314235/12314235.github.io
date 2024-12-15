const form = document.getElementById("cart-form");
const cartContainer = document.getElementById("cart-container");
const saveCartButton = document.getElementById("save-cart");
const loadCartButton = document.getElementById("load-cart");
const itemNameSelect = document.getElementById("item-name");

let cart = [];

async function loadDrinksFromIndex() {
    try {
        const response = await fetch("index.html");
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const cards = doc.querySelectorAll(".drink-card h3");

        if (cards.length === 0) {
            throw new Error("Товары не найдены на странице index.html");
        }

        cards.forEach(card => {
            const option = document.createElement("option");
            option.value = card.textContent.trim();
            option.textContent = card.textContent.trim();
            itemNameSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
        const errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Ошибка загрузки товаров";
        itemNameSelect.appendChild(errorOption);
    }
}

function renderCart() {
    cartContainer.innerHTML = "";
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

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            renderCart();
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const itemName = document.getElementById("item-name").value;
    const itemQuantity = parseInt(document.getElementById("item-quantity").value);
    const itemPrice = parseFloat(document.getElementById("item-price").value);

    if (!itemName || isNaN(itemQuantity) || isNaN(itemPrice) || itemQuantity <= 0 || itemPrice < 0) {
        alert("Пожалуйста, заполните все поля корректно.");
        return;
    }

    cart.push({ name: itemName, quantity: itemQuantity, price: itemPrice });
    renderCart();

    form.reset();
});

saveCartButton.addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Корзина сохранена!");
});

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

loadDrinksFromIndex();
renderCart();