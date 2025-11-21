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


async function displayWeather(city) {
    const apiKey = '4ff00d5f1b7549ccbd4231450251911';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        document.querySelector(".error").classList.remove("hidden");
        return;
    }

    const errorMsg = document.querySelector(".error");
    errorMsg.classList.add("hidden");

    const weatherContainer =  document.querySelector(".weather-form")
    const loader = document.querySelector(".loader");
    const weatherBox = document.querySelector(".weather-box");
    
    // Hide weather container
    weatherContainer.classList.add("hidden");
    // Display spinner
    loader.classList.remove("hidden");

    try {
        // Make a fetch request to WeatherAPI
        const response = await fetch(url);
        // Convert the response to JSON
        const data = await response.json();

       /*console.log(data);
        console.log(data.location.name);
        console.log(data.location.region);
        console.log(data.location.country);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);
        console.log(data.current.condition.icon);
        console.log(data.current.humidity);
        console.log(data.current.feelslike_c);
        console.log(data.current.wind_kph);*/

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
    cityInput.value = "";
}


weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    displayWeather(cityInput.value);
});