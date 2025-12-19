const searchInput = document.getElementById("search-input");
const movieStatus = document.getElementById("status");
const movies = document.getElementById("movies");

let controller;

async function renderMovies(title) {
    // Cancel previous request
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    const key = 'dea6420a';
    const url = `http://www.omdbapi.com/?apikey=${key}&s=${title}`;
        
    movies.textContent = "";

    movieStatus.textContent = "Loading...";

    try {
        const response  = await fetch(url, {
            signal: controller.signal
        });
        const data = await response.json();

        console.log(data);

        if (data.Response === "False") {
            movieStatus.textContent = data.Error;
            return;
        }

        if (!data.Search || data.Search.length === 0) {
            movieStatus.textContent = "No results found";
            return;
        }

        //CLEAR STATUS EVERYTIME AFTER RENDERING
        movieStatus.textContent = "";

        //SET FOR DUPLICATES
        const seenId = new Set();

        const fragment = document.createDocumentFragment();

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

            movie.append(img, h3);

            fragment.appendChild(movie);
        });

        movies.appendChild(fragment);
    
    } catch (error) {
        if (error.name === "AbortError") {
            return; // silently ignore
        }   

        console.log("Error:", error);
        movieStatus.textContent = "Something went wrong";
    }
}

function debounce(fn, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

const debouncedSearch = debounce((value) => {
    renderMovies(value);
}, 400);


searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (value.length < 3) {
        movies.textContent = "";
        movieStatus.textContent = "";
        if (controller) controller.abort();
        return;
    }

    debouncedSearch(value);
});