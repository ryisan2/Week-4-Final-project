
// http://www.omdbapi.com/?i=tt3896198&apikey=cca6a59

const movieEl = document.querySelector('.movie__wrapper')

async function onSearchChange(event) {
    const searchItem = event.target.value
    const movieRes = await fetch(`https://www.omdbapi.com/?apikey=cca6a59&s=${searchItem}`)
    const movieData = await movieRes.json()
    if (movieData.Search) {
        movieEl.innerHTML = movieData.Search.map((movie) => movieHTML(movie)).join('')
    }
    
    else {
        console.error('No movies found')
    }
}

function movieHTML(movie) {
    return `<div class="movie">
    <div class="movie__img">
        <img src="${movie.Poster}" alt="">
        <div class="movie__content">
            <h1>${movie.Title}</h1>
            <h1>${movie.Year}</h1>
            <p><a onclick='movieInfo('${movie.imdbID}')>SEE MORE</a></p>
        </div>
    </div>
</div>`
}

function movieInfo(imdbID) {
    localStorage.setItem("imdbID", imdbID)
    window.location.href = 'movie.html'
}


