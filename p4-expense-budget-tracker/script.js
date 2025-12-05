const balance = document.getElementById("balance");
const text = document.getElementById("text");
const amountEl = document.getElementById("amount");
const type = document.getElementById("type");
const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const spent = document.getElementById("spent");

let transactionArray = [];

function displayExpenses(name, amount, category) {

    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");
    const newBtn = document.createElement("button");

    let numId = transactionList.children.length;

    newLi.id = numId;

    newLi.classList.add("transaction");
    newBtn.classList.add("delete-btn");

    if (category === "income") {
        newLi.classList.add("income");
    } else {
        newLi.classList.add("expense");
    }

    transactionList.appendChild(newLi);
    newLi.appendChild(newSpan);
    newLi.appendChild(newBtn);

    // Display transaction
    newSpan.textContent = `${name} - $${parseFloat(amount).toFixed(2)}`;
    newBtn.innerHTML = `❌`;

    // Store object in array
    transactionArray.push({ id: numId, text: name, amount: Number(amount), type: category });
    
    savedItems();

    // Clear values
    text.value = "";
    amountEl.value = "";

    updateBalance();
        
    totalSpent();

    // Deletes item
    newBtn.addEventListener("click", (event) => {
        const clickedElement = event.target;
        const parentElement = clickedElement.closest("li");
        
        deleteTransaction(parentElement.id);
    });
};

function updateBalance() {
    const sum = transactionArray.reduce((accumulator, currentValue) => {
        if (currentValue.type === "expense") {
            return accumulator - currentValue.amount;
        }
        else {
            return accumulator + currentValue.amount;
        }
    }, 0);

    // Display balance
    balance.textContent = `$${sum.toFixed(2)}`;
}

function totalSpent() {
    // Total spent
    const totalSpent = transactionArray.reduce((acc, item) => {
        return item.type === "expense" ? acc + item.amount : acc;
    }, 0);

    if (transactionArray.length === 0) {
        spent.textContent = `Total Spent: `;
    } else {
        spent.textContent = `Total Spent: ${totalSpent.toFixed(2)}`;
    }
}

function deleteTransaction(id) {
    const targetedLi = document.getElementById(id);
    targetedLi.remove();

    // If object id is not the same as list id it keeps in array
    transactionArray = transactionArray.filter(item => item.id !== Number(id));

    savedItems();
    updateBalance();
    totalSpent();
}

function addTransactionToUI(transaction) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");

    li.id = transaction.id;
    li.classList.add("transaction");

    if(transaction.type === "income") {
        li.classList.add("income");
    } else {
        li.classList.add("expense");
    }

    span.textContent = `${transaction.text} - $${parseFloat(transaction.amount).toFixed(2)}`;
    btn.innerHTML = `❌`;    
    btn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(btn);
    transactionList.appendChild(li);

    // Add delete listener
    btn.addEventListener("click", () => {
        deleteTransaction(transaction.id);
    })


    totalSpent();
    updateBalance();
}


function savedItems() {
    localStorage.setItem("transactions", JSON.stringify(transactionArray));
}

function loadItems() {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    if (!saved) return;

    transactionArray = saved;
;
    saved.forEach(item => {
        addTransactionToUI(item);
    });

}

document.addEventListener("DOMContentLoaded", loadItems);

// Event listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayExpenses(text.value, amountEl.value, type.value);
});
