
// http://www.omdbapi.com/?i=tt3896198&apikey=

const scaleFactor =1/20; //this is the scale factor for the movement of the shapes
const shapes = document.querySelectorAll(".shape")

function moveBg(event) {
  const x = event.clientX * scaleFactor; 
  const y = event.clientY * scaleFactor;
  
  for ( let i = 0; i < shapes.length; i++) { //we loop through the shapes and apply the transform property to each shape
  const isOdd = i % 2 !== 0;
  const boolInt= isOdd ? 1 : -1; //we check if the index is odd or even and apply the oddInt to the transform property
  shapes[i].style.transform = `translate(${x * boolInt}px, ${y*boolInt}px)` //we apply the transform property to the shape
  console.log(x, y)
  }
}




// const movieEl = document.querySelector('.movie__wrapper')

// async function onSearchChange(event) {
//     const searchItem = event.target.value
//     const movieRes = await fetch(`https://www.omdbapi.com/?apikey=cca6a59&s=${searchItem}`)
//     const movieData = await movieRes.json()
//     if (movieData.Search) {
//         movieEl.innerHTML = movieData.Search.map((movie) => movieHTML(movie)).join('')
//     }
    
//     else {
//         console.error('No movies found')
//     }
// }

// function movieHTML(movie) {
//     return `<div class="movie">
//     <div class="movie__img">
//         <img src="${movie.Poster}" alt="">
//         <div class="movie__content">
//             <h1>${movie.Title}</h1>
//             <h1>${movie.Year}</h1>
//             <p><a onclick='movieInfo('${movie.imdbID}')>SEE MORE</a></p>
//         </div>
//     </div>
// </div>`
// }

// function movieInfo(imdbID) {
//     localStorage.setItem("imdbID", imdbID)
//     window.location.href = 'movie.html'
// }


