const balance = document.getElementById("balance");
const text = document.getElementById("text");
const amountEl = document.getElementById("amount");
const type = document.getElementById("type");
const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

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

    // Clear values
    text.value = "";
    amountEl.value = "";

    updateBalance();

    // Deletes item
    newBtn.addEventListener("click", (event) => {
        const clickedElement = event.target;
        const parentElement = clickedElement.closest("li");
        
        deleteTransaction(parentElement.id);
    });

};

function updateBalance() {
    const sum = transactionArray.reduce((accumulator, currentValue) => {
        if (currentValue.type == "expense") {
            return accumulator - currentValue.amount;
        }
        else {
            return accumulator + currentValue.amount;
        }
    }, 0);

    // Display balance
    balance.textContent = `$${sum.toFixed(2)}`;
}

function deleteTransaction(id) {
    const targetedLi = document.getElementById(id);
    targetedLi.remove();

    // If object id is not the same as list id it keep in array
    transactionArray = transactionArray.filter(item => item.id !== Number(id));

    updateBalance();
}

// Event listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayExpenses(text.value, amountEl.value, type.value);
});

