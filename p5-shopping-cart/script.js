const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const total = document.getElementById("total");


const items = [
    {id: crypto.randomUUID(), name: "bowl", price: 25},
    {id: crypto.randomUUID(), name: "cup", price: 15},
    {id: crypto.randomUUID(), name: "phone", price: 150}
 ];


function displayProducts() {
    
    items.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("product");
        li.textContent = item.name;
        productList.appendChild(li);

        const span = document.createElement("span");
        span.classList.add("product-info")
        span.textContent = `$${item.price} `;
        li.appendChild(span);
    });
}

document.addEventListener("DOMContentLoaded", displayProducts);