// Gjorde en modul för alla funktioner som använder för att lägga upp filmer.

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  deleteMovie,
  updateWatchTrue,
  updateWatchFalse,
} from "./displayMovies.js";
import { updateFavoriteTrue, updateFavoriteFalse } from "./displayFavorites.js";
async function postMovie(movie) {
  // Query funktion som kollar om titeln finns eller inte, om den finns kommer den kunna lägga till annars visar den movie already exist.
  try {
    const moviesRef = collection(db, "movies");
    const querySnapshot = await getDocs(
      query(moviesRef, where("title", "==", movie.title))
    );

    if (!querySnapshot.empty) {
      console.log("A movie with the same title already exists.");
    } else {
      await addDoc(moviesRef, movie);
      console.log("Movie added successfully!");
    }
  } catch (error) {
    console.error("Error adding movie: ", error);
  }
}
const postMovieButton = document.querySelector("#addMovieButton");
async function createMovieElement(movie) {
  // Funktion som skapar element som går utifrån datan vi hittar i firebase.
  const moviesElem = document.querySelector("#movies");
  const containerElem = document.createElement("article");
  const titleElem = document.createElement("h3");
  const genreElem = document.createElement("p");
  const dateElem = document.createElement("p");
  const watchedElem = document.createElement("p");
  const removeButton = document.createElement("button");
  const watchedButton = document.createElement("button");
  const favoriteButton = document.createElement("button");

  titleElem.innerText = movie.data.title;
  genreElem.innerText = movie.data.genre;
  dateElem.innerText = movie.data.date;
  watchedElem.innerHTML = movie.data.watched;
  removeButton.innerHTML = "Remove";

  const isWatched = movie.data.watched;
  const isFavorite = movie.data.favorite;

  if (!isWatched) {
    watchedButton.innerText = "Watch";
  } else {
    watchedButton.innerText = "Unwatch";
  }

  if (!isFavorite) {
    favoriteButton.innerText = "Favorite";
  } else {
    favoriteButton.innerText = "Unfavorite";
  }

  containerElem.append(titleElem);
  containerElem.append(genreElem);
  containerElem.append(dateElem);
  containerElem.append(watchedElem);
  containerElem.append(watchedButton);
  containerElem.append(favoriteButton);
  containerElem.append(removeButton);
  moviesElem.append(containerElem);

  removeButton.addEventListener("click", async () => {
    // Knapp för att tabort film
    const movieId = movie.id;
    deleteMovie(movieId);
  });

  watchedButton.addEventListener("click", async () => {
    // Knapp för att se om den är kollad på
    const movieId = movie.id;
    const isWatched = movie.data.watched;

    try {
      if (!isWatched) {
        // Om filmens watched field inte är true
        await updateWatchTrue(movieId);
        movie.data.watched = true; // Updatera fielden // Har inte lyckats att fixa det. För försöka efter inlämning att fixa den...
        watchedElem.innerHTML = true; // Updatera det som displayas
        watchedButton.innerHTML = "Unwatch";
      } else {
        // Om filmen är unwatched uppdatera
        await updateWatchFalse(movieId);
        movie.data.watched = false; // Uppdatera statusen // Har inte lyckats att fixa det. För försöka efter inlämning att fixa den...
        watchedElem.innerHTML = false; // Updatera statusen i elementen också som visas
        watchedButton.innerHTML = "Watch";
      }
    } catch (error) {
      console.error("Error updating movie status: ", error);
    }
  });

  favoriteButton.addEventListener("click", async () => {
    // Favoritknapp
    const movieId = movie.id;
    const isFavorite = movie.data.favorite;

    try {
      if (!isFavorite) {
        // -||-
        await updateFavoriteTrue(movieId);
        movie.data.favorite = true; //-||-
        // -||-
        favoriteButton.innerHTML = "Unfavorite";
      } else {
        // -||-
        await updateFavoriteFalse(movieId);
        movie.data.favorite = false; // -||-
        favoriteButton.innerHTML = "Favorite";
      }
    } catch (error) {
      console.error("Error updating movie status: ", error);
    }
  });
}

export { postMovie, createMovieElement, postMovieButton };
