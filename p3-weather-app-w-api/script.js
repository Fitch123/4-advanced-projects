const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const wind = document.getElementById("wind");


async function displayWeather(city, showLoader = true) {
    const apiKey = '4ff00d5f1b7549ccbd4231450251911';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`;

    const weatherContainer =  document.querySelector(".weather-form");
    const loader = document.querySelector(".loader");
    const weatherBox = document.querySelector(".weather-box");
    const errorMsg = document.querySelector(".error");

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        document.querySelector(".error").classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");
    errorMessage.textContent = "";

    if (showLoader) {
        weatherContainer.classList.add("hidden");
        setTimeout(() => loader.classList.remove("hidden"), 150);
    }
    
    document.querySelector(".search-btn").classList.add("loading");

    try {
        // Make a fetch request to WeatherAPI
        const response = await fetch(url);
        // Convert the response to JSON
        const data = await response.json();

        console.log(data);

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

    } catch (error) {
        console.log("Error:", error);
        loader.classList.add("hidden");
        
        errorMsg.classList.remove("hidden");
        errorMessage.textContent = "City not found 😢";
    }

    document.querySelector(".search-btn").classList.remove("loading");

    cityInput.value = "";
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

document.addEventListener("DOMContentLoaded", () => {
    
    displayWeather("Rosarito", false);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") weatherForm.requestSubmit();
});

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    displayWeather(cityInput.value);
});