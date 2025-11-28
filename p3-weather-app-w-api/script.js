const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");
const forecastContainer = document.getElementById("forecastContainer");
const historyToggle = document.getElementById("historyToggle");
const historyList = document.getElementById("historyList");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const wind = document.getElementById("wind");

const forecast = document.querySelector(".forecast");
const historyContainer = document.querySelector(".historyContainer");
const autocompleteBox = document.querySelector(".autocomplete-box");

const apiKey = '4ff00d5f1b7549ccbd4231450251911';
const countryCodes = {
  "Afghanistan": "AF",
  "Aland Islands": "AX",
  "Albania": "AL",
  "Algeria": "DZ",
  "American Samoa": "AS",
  "Andorra": "AD",
  "Angola": "AO",
  "Anguilla": "AI",
  "Antarctica": "AQ",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "British Indian Ocean Territory": "IO",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Cape Verde": "CV",
  "Caribbean Netherlands": "BQ",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Christmas Island": "CX",
  "Cocos (Keeling) Islands": "CC",
  "Colombia": "CO",
  "Comoros": "KM",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Curaçao": "CW",
  "Cyprus": "CY",
  "Czech Republic": "CZ",
  "Democratic Republic of the Congo": "CD",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini": "SZ",
  "Ethiopia": "ET",
  "Falkland Islands": "FK",
  "Faroe Islands": "FO",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "French Southern Territories": "TF",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guadeloupe": "GP",
  "Guam": "GU",
  "Guatemala": "GT",
  "Guernsey": "GG",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Isle of Man": "IM",
  "Israel": "IL",
  "Italy": "IT",
  "Ivory Coast": "CI",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jersey": "JE",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Kosovo": "XK",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macau": "MO",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mayotte": "YT",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar (Burma)": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "Niue": "NU",
  "Norfolk Island": "NF",
  "North Korea": "KP",
  "North Macedonia": "MK",
  "Northern Mariana Islands": "MP",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Pitcairn Islands": "PN",
  "Poland": "PL",
  "Portugal": "PT",
  "Puerto Rico": "PR",
  "Qatar": "QA",
  "Republic of the Congo": "CG",
  "Réunion": "RE",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Barthélemy": "BL",
  "Saint Helena": "SH",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Martin": "MF",
  "Saint Pierre and Miquelon": "PM",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Sint Maarten": "SX",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tokelau": "TK",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Turks and Caicos Islands": "TC",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "UK",
  "United States of America": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Vatican City": "VA",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Virgin Islands (British)": "VG",
  "Virgin Islands (U.S.)": "VI",
  "Wallis and Futuna": "WF",
  "Western Sahara": "EH",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
};

// MAIN FUNCTION
async function displayWeather(city, lat, lon, showLoader = true, saveToHistory = true) {

    let query = city; 
    if (lat && lon) {
        query = `${lat},${lon}`;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=no`;

    const weatherContainer =  document.querySelector(".weather-form");
    const loader = document.querySelector(".loader");
    const weatherBox = document.querySelector(".weather-box");
    const errorMsg = document.querySelector(".error");
    const forecast = document.querySelector(".forecast");

    if (!city && !lat && !lon) {
        errorMessage.textContent = "Please enter a city name.";
        document.querySelector(".error").classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");
    errorMessage.textContent = "";

    if (showLoader) {
        weatherContainer.classList.add("hidden");
        loader.classList.remove("hidden")
    }
    
    document.querySelector(".search-btn").classList.add("loading");

    // Reset day cards
    forecastContainer.textContent = "";

    // API fetching 
    try {
        // Make a fetch request to WeatherAPI
        const response = await fetch(url);
        // Convert the response to JSON
        const data = await response.json();

        //console.log(data);   

        changeBackground(data.current.condition.code, data.current.is_day);
        
        const countryCode = countryCodes[data.location.country] || "";

        // Update the UI With the Weather Data
        cityName.textContent = `${data.location.name}, ${data.location.region}, ${countryCode}`;
        weatherIcon.src = data.current.condition.icon;
        temperature.textContent = `${data.current.temp_c}°C`;
        description.textContent = data.current.condition.text;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        feelsLike.textContent = `Feels: ${data.current.feelslike_c}°C`;
        wind.textContent = `Wind: ${data.current.wind_kph} km/h`;


        if (saveToHistory && city) {
            const formatted = `${data.location.name}, ${data.location.region}, ${countryCode}`;
            saveCityToHistory(formatted);
            renderCityButtons();
            historyContainer.classList.remove("hidden");
        }
        
        // Display weather box
        weatherBox.classList.remove("hidden");

        // Hide spinner
        loader.classList.add("hidden");

        // Display weather container
        weatherContainer.classList.remove("hidden");

        // Show forecast
        data.forecast.forecastday.forEach(day => {
            renderDayCard(day);
        });

        //Display forecast div
        forecast.classList.remove("hidden");

    } catch (error) {
        console.log("Error:", error);
        weatherContainer.classList.remove("hidden");
        loader.classList.add("hidden");
        errorMsg.classList.remove("hidden");
        errorMsg.textContent = "City not found 😢";
    }

    
    document.querySelector(".search-btn").classList.remove("loading");

    cityInput.value = "";
}
// HELPER FUNCTIONS
async function getCitySuggestions(query) {
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

    try {
        // Make a fetch request to WeatherAPI
        const response = await fetch(url);
        // Convert the response to JSON
        const data = await response.json();

        //console.log(data);

        autocompleteBox.innerHTML = "";
        data.forEach(c => {
            //console.log(c.name);
            const li = document.createElement("li");
            li.classList.add("autocomplete-item");
            const countryCode = countryCodes[c.country] || "";
            li.textContent = `${c.name}, ${c.region}, ${countryCode}`;
            li.onclick = () => {
                const formatted = `${c.name}, ${c.region}, ${c.country}`;
                saveCityToHistory(formatted);
                renderCityButtons(); 
                autocompleteBox.innerHTML = ""; 
                autocompleteBox.classList.remove("show");
                historyContainer.classList.remove("hidden");
                displayWeather(formatted)
            };
            autocompleteBox.appendChild(li);
            autocompleteBox.classList.add("show");
        });
    } catch (error) {
        console.log("Error:", error);
    }
}

function changeBackground(code, isDay) {
    const clouds = document.querySelector(".clouds");
    const rain = document.querySelector(".rain");
    const snow = document.querySelector(".snow");
    const fog = document.querySelector(".fog");

    // Reset all effects
    clouds.style.opacity = 0;
    rain.style.opacity = 0;
    snow.style.opacity = 0;
    fog.style.opacity = 0;

    let bg;

    // ---- CLEAR ----
    if (code === 1000) {
        bg = isDay
            ? "linear-gradient(to bottom, #4fc3f7, #0288d1)"
            : "linear-gradient(to bottom, #0d47a1, #000428)";
    }

    // ---- PARTLY CLOUDY ----
    else if (code === 1003) {
        bg = isDay
            ? "linear-gradient(to bottom, #8ec5fc, #e0c3fc)"
            : "linear-gradient(to bottom, #2c3e50, #4ca1af)";
        clouds.style.opacity = 0.5;
    }

    // ---- CLOUDY ----
    else if (code === 1006 || code === 1009) {
        bg = "linear-gradient(to bottom, #757f9a, #d7dde8)";
        clouds.style.opacity = 0.7;
    }

    // ---- FOG / MIST ----
    else if ([1030, 1135, 1147].includes(code)) {
        bg = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
        fog.style.opacity = 0.6;
        clouds.style.opacity = 0.4;
    }

    // ---- RAIN ----
    else if (code >= 1063 && code <= 1207) {
        bg = "linear-gradient(to bottom, #4b79a1, #283e51)";
        rain.style.opacity = 0.7;
        clouds.style.opacity = 0.5;
    }

    // ---- THUNDER ----
    else if ([1087].includes(code)) {
        bg = "linear-gradient(to bottom, #141e30, #243b55)";
        rain.style.opacity = 0.8;
        clouds.style.opacity = 0.6;
    }

    // ---- SNOW ----
    else if (code >= 1210 && code <= 1282) {
        bg = "linear-gradient(to bottom, #e0eafc, #cfdef3)";
        snow.style.opacity = 0.9;
    }

    // ---- FALLBACK ----
    else {
        bg = "linear-gradient(135deg, #6dd5fa, #2980b9)";
    }

    // Apply background
    document.body.style.background = bg;
}

function renderDayCard(dayArray) {
    // day = data.forecast.forecastday[i]
    // Card data
    const date = dayArray.date;
    const maxTemp = dayArray.day.maxtemp_c;
    const minTemp = dayArray.day.mintemp_c;
    const icon = dayArray.day.condition.icon;
    const text = dayArray.day.condition.text;

    // Convert date to weekday
    const dateObject = new Date(date + 'T00:00:00');
    const weekDay = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // New element for card
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");
    forecast.appendChild(dayCard);

    // Date Information
    const dateInfo = document.createElement("p"); 
    dateInfo.classList.add("day-name");
    let chooseDay = (date === formattedDate) ? "Today" : weekDay;
    dateInfo.textContent = chooseDay;
    dayCard.appendChild(dateInfo);

    // Temperature Information
    const tempInfo = document.createElement("p"); 
    tempInfo.classList.add("temp");
    tempInfo.textContent = `${maxTemp}° / ${minTemp}°`;
    dayCard.appendChild(tempInfo);

    // Icon logo
    const newIcon = document.createElement("img");
    newIcon.src = icon;
    dayCard.appendChild(newIcon);

    // Text Information
    const textInfo = document.createElement("p");
    textInfo.classList.add("text");
    textInfo.textContent = text;
    dayCard.appendChild(textInfo);
}

function saveCityToHistory(formattedCity) {
    const cityId = formattedCity.split(",")[0].trim().toLowerCase();

    // Get history or empty array
    let history = JSON.parse(localStorage.getItem("history")) || [];

    // Remove duplicates
    history = history.filter(c => c.split(",")[0].trim().toLowerCase() !== cityId);

    // Add new city to front
    history.unshift(formattedCity);
  
    // Limit to last 5
    history = history.slice(0, 5);

    // Save
    localStorage.setItem("history", JSON.stringify(history));
}

function renderCityButtons() {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    historyList.innerHTML = "";
    history.forEach(city => {
        const newCity = document.createElement("li");
        newCity.classList.add("history");
        newCity.textContent = city;
        newCity.onclick = () => {
        const cityName = city.split(",")[0];   // "London"
            displayWeather(cityName.trim());
        };
        historyList.appendChild(newCity);
    });
}

function loadSavedCity() {
    let savedHistory = JSON.parse(localStorage.getItem("history"));
    if(savedHistory && savedHistory.length > 0) {
        historyContainer.classList.remove("hidden");
        displayWeather(savedHistory[0]);
    } else {
        historyContainer.classList.add("hidden");
    }
}

function geolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                displayWeather(null, latitude, longitude, true, false);
            },
            (error) => {
                let savedHistory = JSON.parse(localStorage.getItem("history"));
                if (savedHistory && savedHistory.length > 0) {
                    displayWeather(savedHistory[0]);
                } else {
                    displayWeather("San Diego");
                }
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    } else {
        // Geolocation is not available
        let savedHistory = JSON.parse(localStorage.getItem("history"));
        if (savedHistory && savedHistory.length > 0) {
            displayWeather(savedHistory[0]);
        } else {
            displayWeather("San Diego");
        }
    }
}

// EVENT HANDLERS
document.addEventListener("DOMContentLoaded", () => {
    renderCityButtons();
    loadSavedCity(); 
});

window.onload = () => {
    geolocation();
};

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") weatherForm.requestSubmit();
});

document.addEventListener("click", (e) => {
    const clickedInsideBox = autocompleteBox.contains(e.target);
    const clickedInput = e.target.id === "cityInput";

    if (!clickedInsideBox && !clickedInput) {
        autocompleteBox.classList.remove("show");
    } else {
        autocompleteBox.classList.add("show");
    }
});

historyToggle.addEventListener("click", () => {
    historyList.classList.toggle("open");

    if (historyList.classList.contains("open")) {
        historyToggle.textContent = "Recent ▲"; // opened
    } else {
        historyToggle.textContent = "Recent ▼"; // closed
    }
});

cityInput.addEventListener("input", (e) => {
    getCitySuggestions(e.target.value); 
});

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    displayWeather(cityInput.value);
    historyContainer.classList.remove("hidden");
    autocompleteBox.innerHTML = "";
    autocompleteBox.classList.remove("show");
});

