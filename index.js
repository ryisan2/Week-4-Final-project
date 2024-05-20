// http://www.omdbapi.com/?i=tt3896198&apikey=cca6a59

const movieEl = document.querySelector(".movie__wrapper");
const modalEl = document.querySelector(".modal");
const searchInput = document.querySelector(".search__box");

async function onSearchChange(event) {
  const searchItem = event.target.value.trim(); // Trim whitespace
  if (!searchItem) {
    movieEl.innerHTML = ""; // Clear results if the input is empty
    return;
  }

  console.log("Searching for:", searchItem);

  try {
    const movieRes = await fetch(`https://www.omdbapi.com/?apikey=cca6a59&s=${searchItem}`);
    const movieData = await movieRes.json();
    console.log("Fetched movie data:", movieData);
    
    if (movieData.Response === "True" && movieData.Search) {
      movieEl.innerHTML = movieData.Search.map((movie) => movieHTML(movie)).join("");
    } else {
      console.error("No movies found");
      movieEl.innerHTML = "<p>No movies found</p>";
    }
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    movieEl.innerHTML = "<p>Failed to load movies. Please try again later.</p>";
  }
}

function movieHTML(movie) {
  return `
    <div class="movie">
      <div class="movie__content">
        <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img" onclick='toggleModal(${JSON.stringify(movie).replace(/'/g, "\\'").replace(/"/g, '&quot;')})'>
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

function toggleModal(movie) {
  isModalOpen = !isModalOpen; // Toggle the modal state
  
  if (isModalOpen && movie) {
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
      <h4 class="contact__sub">${movie.Released}</h4>
      <h4 class="contact__sub">${movie.Rated}</h4>
      <p>${movie.Plot}</p>
      <div class="btn__div">
        <button id="contact_submit" class="contact__btn click" type="submit">
          Purchase Tickets!
        </button>
      </div>
    `;

    document.body.classList.add("modal__open");
  } else {
    document.body.classList.remove("modal__open");
  }
}

function movieInfo(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  window.location.href = "movie.html";
}

// Attach the onSearchChange function to the search input field
searchInput.addEventListener("input", onSearchChange);
