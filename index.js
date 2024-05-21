const scaleFactor = 1 / 20;

function moveBg(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
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
      <div class="movie" >
        <div class="movie__content click__me" data-movie='${JSON.stringify( movie )}' onclick='toggleModal(this)'>
          <img src="${movie.Poster}" alt="" class="movie__img" >
          <div class="movie__info">
            <div class="more-info">
              <h1>${movie.Title}</h1>
              <h1>${movie.Year}</h1>
              <p><a onclick="movieInfo('${
                movie.imdbID
              }')">Click to SEE MORE</a></p>
            </div>
          </div>
        </div>
      </div>`;
}

let isModalOpen = false;

function toggleModal(clickedElement, event) {
  // If the event object is provided, stop the propagation
  if (event) {
    event.stopPropagation();
  }

  const modal = document.querySelector(".modal");

  // Check if the clicked element has the data attribute for movie
  if (clickedElement && clickedElement.dataset.movie) {
    const movie = JSON.parse(clickedElement.dataset.movie);
    modalInfo(movie); // Make sure this function is defined and works correctly
    modal.classList.add("modal__open");
    isModalOpen = true;
  } else {
    modal.classList.remove("modal__open");
    console.log("closing modal");
    isModalOpen = false;
  }
}


function modalInfo(movie) {
  document.body.classList.add("modal__open");
  // Update the left side of the modal with the movie name and poster
  const modalLeft = document.querySelector(".modal__half-left");
  modalLeft.innerHTML = `
    <div class="information intro__txt2">
      <h3><span class="modal__title modal__title--about">${movie.Title}</span></h3>
      <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img">
    </div>
  `;

  // Update the right side of the modal with the movie information
  const modalRight = document.querySelector(".modal__half-right");
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
        <div > 
        <i class="fas fa-times modal__exit click__me" onclick="closeModal()" ></i> 
      </div>
          </div>
      </button>
    </div>
  `;
}

function closeModal() {
  document.body.classList.remove("modal__open");
}

// Close the modal when the user clicks outside of it
document.addEventListener("click__me", function (event) {
  if (isModalOpen) {
    toggleModal();
  }
});   

function movieInfo(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = "movie.html";
}

function toggleContrast() {
  document.body.classList.toggle("dark-theme");
}
