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
const historyContainer = document.querySelector(".historyContainer")

// MAIN FUNCTION
async function displayWeather(city, lat, lon, showLoader = true) {
    const apiKey = '4ff00d5f1b7549ccbd4231450251911';

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

        console.log(data);
        console.log(data.location.lat)
        console.log(data.location.lon)

        changeBackground(data.current.condition.code, data.current.is_day);

        // Update the UI With the Weather Data
        cityName.textContent = `${data.location.name} / ${data.location.country}`;
        weatherIcon.src = data.current.condition.icon;
        temperature.textContent = `${data.current.temp_c}°C`;
        description.textContent = data.current.condition.text;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        feelsLike.textContent = `Feels: ${data.current.feelslike_c}°C`;
        wind.textContent = `Wind: ${data.current.wind_kph} km/h`;

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

function saveCityToHistory(city) {
    // Normalize inside the same function
    city = city.trim().toLowerCase();

    // Get history or empty array
    let history = JSON.parse(localStorage.getItem("history")) || [];

    // Remove duplicates
    history = history.filter(c => c !== city);

    // Add new city to front
    history.unshift(city);
  
    // Limit to last 5
    history = history.slice(0, 5);

    // Save
    localStorage.setItem("history", JSON.stringify(history));

    historyContainer.classList.remove("hidden");
}

function renderCityButtons() {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    historyList.innerHTML = "";
    history.forEach(city => {
        const newCity = document.createElement("li");
        newCity.classList.add("history");
        newCity.textContent = formatCityName(city);
        newCity.onclick = () => displayWeather(city);
        historyList.appendChild(newCity);
    });
}

function formatCityName(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
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
                displayWeather(null, latitude, longitude);
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

window.onload = () => {
    geolocation();
}
document.addEventListener("DOMContentLoaded", () => {
    renderCityButtons();
    loadSavedCity(); 
});

window.onload = () => {
    geolocation();
}

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") weatherForm.requestSubmit();
});

historyToggle.addEventListener("click", () => {
    historyList.classList.toggle("open");

    if (historyList.classList.contains("open")) {
        historyToggle.textContent = "Search History ▲"; // opened
    } else {
        historyToggle.textContent = "Search History ▼"; // closed
    }
});

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    displayWeather(cityInput.value);
    saveCityToHistory(cityInput.value)
    renderCityButtons();
    historyContainer.classList.remove("hidden");
});