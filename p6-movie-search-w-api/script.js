const searchInput = document.getElementById("search-input");
const movieStatus = document.getElementById("status");
const movies = document.getElementById("movies");


async function renderMovies(title, poster) {
    const key = 'dea6420a';
    const url = `http://www.omdbapi.com/?apikey=${key}&t=${title}`;

    try {
        const response  = await fetch(url);

        const data = await response.json();

        console.log(data);
    } catch {

    }
}

searchInput.addEventListener("input", (e) => {
    if (e.target.value.trim() !== "") {
        //renderMovies(e.target.value);
        console.log(e.target.value);
    }
});