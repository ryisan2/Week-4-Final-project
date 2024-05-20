const scaleFactor =1/20; //this is the scale factor for the movement of the shapes

function moveBg(event) {
  const shapes = document.querySelectorAll(".shape")
  const x = event.clientX * scaleFactor; 
  const y = event.clientY * scaleFactor;
  
  for ( let i = 0; i < shapes.length; i++) { //we loop through the shapes and apply the transform property to each shape
  const isOdd = i % 2 !== 0;
  const boolInt= isOdd ? 1 : -1; //we check if the index is odd or even and apply the oddInt to the transform property
  shapes[i].style.transform = `translate(${x * boolInt}px, ${y*boolInt}px)` //we apply the transform property to the shape
  console.log(x, y)
  }
}


const movieEl = document.querySelector(".movie__wrapper");

async function onSearchChange(event) {
  const searchItem = event.target.value;
  const movieRes = await fetch(
    `https://www.omdbapi.com/?apikey=cca6a59&s=${searchItem}`
  );
  const movieData = await movieRes.json();
  if (movieData.Search) {
    movieEl.innerHTML = movieData.Search.map((movie) => movieHTML(movie)).join(
      ""
    );
  } else {
    console.error("No movies found");
  }
}

function movieHTML(movie) {
  return `
    <div class="movie">
      <div class="movie__content">
        <img src="${movie.Poster}" alt="" class="movie__img" onclick='toggleModal(${JSON.stringify(movie).replace(/'/g, "\\'").replace(/"/g, '&quot;')})'>
        <div class="movie__info">
          <div class="more-info">
            <h1>${movie.Title}</h1>
            <h1>${movie.Year}</h1>
            <p><a onclick="movieInfo('${movie.imdbID}')">SEE MORE</a></p>
          </div>
        </div>
      </div>
    </div>`;
}

let isModalOpen = false;

function toggleModal(movie = null) {
  isModalOpen = !isModalOpen;

  if (isModalOpen && movie) {
    modalInfo(movie);
  } else {
    document.body.classList.remove("modal__open");
  }
}

function modalInfo(movie) {
    document.body.classList.add("modal__open"); 
  // Update the left side of the modal with the movie name and poster
  const modalLeft = document.querySelector('.modal__half-left');
  modalLeft.innerHTML = `
    <div class="information intro__txt2">
      <h3><span class="modal__title modal__title--about">${movie.Title}</span></h3>
      <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img">
    </div>
  `;

  // Update the right side of the modal with the movie information
  const modalRight = document.querySelector('.modal__half-right');
  modalRight.innerHTML = `
    <h3 class="contact__header"><span>${movie.Title}</span></h3>
    <br>
    <h4 class="contact__sub">${movie.Rated}</h4>
    <h4 class="contact__sub">${movie.Rated}</h4>
    <p>${movie.Plot}</p>
    <div class="btn__div">
      <button id="contact_submit" class="contact__btn click__me" type="submit">
        Purchase Tickets!
        </div>
        <div> <i class="fas fa-times modal__exit click" onclick="toggleModal()"></i> </div>
    </div>
      </button>
    </div>
  `;

}

function movieInfo(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = "movie.html";
}

function toggleContrast() {
  document.body.classList.toggle("dark-theme");
}
