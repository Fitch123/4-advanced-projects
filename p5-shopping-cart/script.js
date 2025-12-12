const cartBtn = document.getElementById("open-cart-btn");
const closeBtn = document.getElementById("close-cart-btn");
const productGrid = document.getElementById("product-grid");
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("cart-total");


const items = [
    {
        id: crypto.randomUUID(), 
        name: "wireless headphones", 
        price: 59.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: crypto.randomUUID(), 
        name: "mechanical keyboard", 
        price: 89.99,
        image: "https://images.unsplash.com/photo-1602025882379-e01cf08baa51?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    },
    {
        id: crypto.randomUUID(), 
        name: "bluetooth speaker", 
        price: 29.99,
        image: "https://images.unsplash.com/photo-1582978571763-2d039e56f0c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {id: crypto.randomUUID(), 
        name: "smart watch", 
        price: 129.99,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
 ];


function displayProducts() {

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.dataset.id = item.id;
        productGrid.appendChild(div);
        
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        div.appendChild(img);

        const h3 = document.createElement("h3");
        h3.classList.add("product-name");
        h3.textContent = (item.name).charAt(0).toUpperCase() + item.name.slice(1);
        div.appendChild(h3);

        const p = document.createElement("p");
        p.classList.add("price");
        p.textContent = `$${item.price}`;
        div.appendChild(p);

        const btn = document.createElement("button");
        btn.classList.add("add-btn");
        btn.textContent = "Add to cart";
        div.appendChild(btn);
    });
}

function addToCart() {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItems.appendChild(cartItem);

    const itemLeft = document.createElement("div");    
    itemLeft.classList.add("cart-item-left");
    cartItem.appendChild(itemLeft);

    const itemImg = document.createElement("img");
    itemImg.classList.add("cart-item-img");
    itemImg.src = items[0].image;
    itemLeft.appendChild(itemImg);

    const itemInfo = document.createElement("div");    
    itemInfo.classList.add("cart-item-info");
    itemLeft.appendChild(itemInfo);;

    const itemName = document.createElement("p");
    itemName.classList.add("cart-item-name");
    itemName.textContent = "BLUETOOTH HEADPHONES";
    itemInfo.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("cart-item-price");
    itemPrice.textContent = "30.00";
    itemInfo.appendChild(itemPrice);

    const itemRight = document.createElement("div");
    itemRight.classList.add("cart-item-right");
    cartItem.appendChild(itemRight);

    const qtyWrapper = document.createElement("div");
    qtyWrapper.classList.add("cart-item-qty");
    itemRight.appendChild(qtyWrapper);

    const minusBtn = document.createElement("button");
    minusBtn.classList.add("qty-btn");
    minusBtn.textContent = "−";
    qtyWrapper.appendChild(minusBtn);

    const qtyNumber = document.createElement("span");
    qtyNumber.classList.add("qty-number");
    qtyNumber.textContent = "1";
    qtyWrapper.appendChild(qtyNumber);

    const plusBtn = document.createElement("button");
    plusBtn.classList.add("qty-btn");
    plusBtn.textContent = "+";
    qtyWrapper.appendChild(plusBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "✖";
    cartItem.appendChild(removeBtn);
}

function closeButton() {
    cartOverlay.classList.remove("show")
    cartOverlay.classList.add("hidden");
    cartOverlay.classList.remove("show");
    cartDrawer.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    addToCart();
});

cartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("hidden");
    cartOverlay.classList.add("show");
    cartDrawer.classList.add("open");
});

closeBtn.addEventListener("click", closeButton);

cartOverlay.addEventListener("click", closeButton);



