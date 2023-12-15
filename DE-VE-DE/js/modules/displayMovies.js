// Denna modulen visar allting som man använder för att visa filmerna, alla funktioner hjälper med att display filmerna.

import { db } from "./firebase-config.js";
import { createMovieElement } from "./postMovies.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function getMovie() {
  // Funktionen ställer query, skapar en tom array där vi ska slänga in allt som uppfyller kraven på vår query. Vi loopar igenom dokumenten i firebase och tar det som uppfyller vår query.
  try {
    const querySnapshot = await getDocs(collection(db, "movies"));
    const movies = [];

    querySnapshot.forEach((doc) => {
      const movie = {
        id: doc.id,
        data: doc.data(),
      };
      movies.push(movie);
    });

    return movies;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return []; // Returnerar tom array (isåfall de blir error)
  }
}

async function deleteMovie(id) {
  // Funktion för radera filmer
  try {
    await deleteDoc(doc(db, "movies", id));
    location.reload();
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function updateWatchTrue(id) {
  // Hårdkoda uppdatering på status
  try {
    await updateDoc(doc(db, "movies", id), {
      watched: true,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function updateWatchFalse(id) {
  // Hårdkoda uppdatering på status
  try {
    await updateDoc(doc(db, "movies", id), {
      watched: false,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

function displayMovies(movies) {
  // Loopar igenom vår array som vi skapade ovan och skapar element för allt som är inuti arrayen.
  const moviesElem = document.querySelector("#movies");
  moviesElem.innerHTML = ""; // Resettar containern

  movies.forEach((movie) => {
    createMovieElement(movie);
  });
}

export {
  getMovie,
  deleteMovie,
  updateWatchTrue,
  updateWatchFalse,
  displayMovies,
};
