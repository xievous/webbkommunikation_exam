// Denna js filen ingår alla knappar som aktiverar all funktioner som är uppdelat i moduler.

import { postMovie, postMovieButton } from "./modules/postMovies.js";
import {
  searchTitleButton,
  displayTitleResults,
  searchTitle,
} from "./modules/searchMovies.js";
import { getMovie, displayMovies } from "./modules/displayMovies.js";

import {
  getFavorites,
  showFavoriteButton,
  displayFavorites,
} from "./modules/displayFavorites.js";

// Lägger till film i collektion movies i min firebase

showFavoriteButton.addEventListener("click", async () => {
  const retrieveFavorites = await getFavorites();
  displayFavorites(retrieveFavorites);
});

postMovieButton.addEventListener("click", async () => {
  const movie = {
    title: document.querySelector("#movieTitle").value,
    genre: document.querySelector("#movieGenre").value,
    date: document.querySelector("#releaseDate").value,
    watched: false,
    favorite: false,
  };

  await postMovie(movie); // Väntar på filmen ska bli tillagd innan den refetchar filmerna
  const movies = await getMovie(); // Få uppdaterad lista
  displayMovies(movies); // Visa
});

searchTitleButton.addEventListener("click", async () => {
  const titleSearch = document.querySelector("#titleSearch").value;
  const search = await searchTitle(titleSearch);
  displayTitleResults(search);
});
