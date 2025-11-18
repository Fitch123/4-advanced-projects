const btn = document.getElementById("btn");
const joke = document.getElementById("joke");
const spinner = document.getElementById("spinner");

async function getData() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark,Pun,Spooky?type=single';

    // Show spinner, hide joke text
    spinner.classList.remove("hidden");
    btn.classList.add("hidden");
    joke.textContent = "";

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        // Hide spinner
        spinner.classList.add("hidden");
        btn.classList.remove("hidden");

        // Show joke
        joke.textContent = result.joke;

    } catch (error) {
        spinner.classList.add("hidden");
        joke.textContent = "Error loading joke 😭";
    }
}

btn.addEventListener("click", getData);
