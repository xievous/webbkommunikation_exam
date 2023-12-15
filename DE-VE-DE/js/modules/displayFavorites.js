// Denna modulen finns för att visa allting som har med favorit funktionen att göra.
import { db } from "./firebase-config.js";
import { displayMovies, getMovie } from "./displayMovies.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const showFavoriteButton = document.querySelector("#showFavorites");

async function getFavorites() {
  // Query funktion som ställer fråga allting som uppfyller den slängs in i array.
  try {
    const queryFavorites = query(
      collection(db, "movies"),
      where("favorite", "==", true)
    );
    const favoriteMoviesSnapshot = await getDocs(queryFavorites);

    const favoriteMovies = [];

    favoriteMoviesSnapshot.forEach((doc) => {
      const favoriteMovie = {
        id: doc.id,
        data: doc.data(),
      };
      favoriteMovies.push(favoriteMovie);
    });

    return favoriteMovies;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return [];
  }
}

async function updateFavoriteTrue(id) {
  // Hårdkoda uppdatering på status i favoriter till true
  try {
    await updateDoc(doc(db, "movies", id), {
      favorite: true,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function updateFavoriteFalse(id) {
  // Hårdkoda uppdatering på status i favoriter till False
  try {
    await updateDoc(doc(db, "movies", id), {
      favorite: false,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

function createFavoriteMovieElement(favoriteMovie) {
  //Skapa element för att visa alla favoriter.
  const favoriteElem = document.querySelector("#favoritesBox");
  const containerElem = document.createElement("div");
  const titleElem = document.createElement("h3");
  const genreElem = document.createElement("p");
  const dateElem = document.createElement("p");

  titleElem.innerText = favoriteMovie.data.title;
  genreElem.innerText = favoriteMovie.data.genre;
  dateElem.innerText = favoriteMovie.data.date;

  containerElem.append(titleElem);
  containerElem.append(genreElem);
  containerElem.append(dateElem);
  favoriteElem.append(containerElem);
}

function displayFavorites(favoriteMovies) {
  //Visar favoriter utifrån arrayen som slängt in resultat.
  const containerElem = document.querySelector("#favoritesBox");
  containerElem.innerHTML = ""; // Resettar containern så att de inte blir duplikater varje gång man trycker.
  favoriteMovies.forEach((favoriteMovie) => {
    createFavoriteMovieElement(favoriteMovie);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  //Kör mina funktioner när HTML dokumentat är laddat.
  const movies = await getMovie();
  displayMovies(movies);
});

export {
  showFavoriteButton,
  updateFavoriteTrue,
  updateFavoriteFalse,
  displayFavorites,
  getFavorites,
};
