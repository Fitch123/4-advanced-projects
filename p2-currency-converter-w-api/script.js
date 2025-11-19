const amountInput = document.getElementById("amount");
const fromCurr = document.getElementById("fromCurr");
const toCurr = document.getElementById("toCurr");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const converterForm = document.getElementById("converterForm");
const result = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const loader = document.getElementById("loader");



async function loadCurrencies() {
    const apiKey = '6f063eef85a5ee3fe05cc8b1';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        const conversionRates = data.conversion_rates;
        function populateSelect(selectElement, conversionRates) {
            for (const currencyCode in conversionRates) {
                if (conversionRates.hasOwnProperty(currencyCode)) {
                    const option = document.createElement("option");
                    option.textContent = currencyCode;
                    option.value = currencyCode;
                    selectElement.appendChild(option);
                }
            }
        }

        populateSelect(fromCurr, conversionRates);
        populateSelect(toCurr, conversionRates);

        fromCurr.value = "USD"
        toCurr.value = "EUR"; 

    } catch (error) {
        console.log("Error:", error);
    }

}

async function convert(from, to, amount) {
    const apiKey = '6f063eef85a5ee3fe05cc8b1';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    const rateClass = document.querySelector(".rate");
    const resultclass = document.querySelector(".result");

    // Show loader spinner when submit
    loader.classList.remove("hidden");

    // Hide rate
    rateClass.classList.add("hidden");

    // Hide result
    resultclass.classList.add("hidden");


    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        let rate = data.conversion_rates[to];

        let convertedAmount = amount * rate;

        saveLastConversion({
            amount,
            from,
            to,
            rate,
            result: convertedAmount
        });

        // Rate rounded to the 3rd decimal
        rateInfo.textContent = `Exchange rate: ${Math.round(rate * 1000) / 1000}`;

        // Result rounded to the 3rd decimal
        result.textContent = `Result: ${Math.round(convertedAmount * 1000) / 1000}`;

        // Show loader spinner
        loader.classList.add("hidden");

        // Show rate
        rateClass.classList.remove("hidden");

        // Show result
        resultclass.classList.remove("hidden");

    } catch (error) {
        loader.classList.add("hidden");
        result.textContent = "Error fetching data";
        console.log("Error:", error);
    }
}

 
function saveLastConversion(data) {
    localStorage.setItem("conversions", JSON.stringify(data));
}

function loadLastConversion() {
    const last = localStorage.getItem("conversions");
    if (!last) return;

    const data = JSON.parse(last);

    // apply data back into the UI
    amountInput.value = data.amount;
    fromCurr.value = data.from;
    toCurr.value = data.to;

    rateInfo.textContent = `Exchange rate: ${Math.round(data.rate * 1000) / 1000}`;
    result.textContent = `Result: ${Math.round(data.result * 1000) / 1000}`;


}


document.addEventListener("DOMContentLoaded", async () => {
    await loadCurrencies();
    loadLastConversion();
});


converterForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (converterForm.reportValidity()) {
       await convert(fromCurr.value, toCurr.value, amountInput.value)
       hasBeenConvertedOnce = true; 
    }
});


let hasBeenConvertedOnce = false;

swapBtn.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    if (hasBeenConvertedOnce) {
        convert(fromCurr.value, toCurr.value, amountInput.value);
    }
})

