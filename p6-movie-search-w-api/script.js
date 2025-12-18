const searchInput = document.getElementById("search-input");
const movieStatus = document.getElementById("status");
const movies = document.getElementById("movies");


async function renderMovies(title) {
    const key = 'dea6420a';
    const url = `http://www.omdbapi.com/?apikey=${key}&s=${title}`;
        
    movies.textContent = "";

    movieStatus.textContent = "Loading...";

    try {
        const response  = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.Response === "False") {
            movieStatus.textContent = data.Error;
            return;
        }

        //CLEAR STATUS EVERYTIME AFTER RENDERING
        movieStatus.textContent = "";

        //SET FOR DUPLICATES
        const seenId = new Set();

        //ITERATE THROUGH EACH MOVIE TITLE AND POSTER
        data.Search.forEach(element => {
            // CHECK FOR DUPLICATES IN THE SET
            if (seenId.has(element.imdbID)) return;
            seenId.add(element.imdbID);

            const movie = document.createElement("div");
            movie.classList.add("movie");

            const img = document.createElement("img");

            if (element.Poster === "N/A") {
                img.src = "https://www.popcorn.app/assets/app/images/placeholder-movieimage.png";
            } else {
                img.src = element.Poster;
            }
                img.onerror = () => {
                img.src = "https://www.popcorn.app/assets/app/images/placeholder-movieimage.png";
            };

            const h3 = document.createElement("h3");
            h3.textContent = element.Title;

            movie.appendChild(img);
            movie.appendChild(h3);

            movies.appendChild(movie);
        });
        

    } catch (error) {
        console.log("Error:", error)
        movieStatus.textContent = "No movies found.";
    }
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (value === "") {
        movies.textContent = "";
        movieStatus = "";
        return;
    }

    renderMovies(value);
});