// Denna modulen har allting med sökfunktionen att göra, gjort den till en modul för att det underlättar att förstå vad som gör vad.

import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase-config.js";

const searchTitleButton = document.querySelector("#searchTitle");

function createTitleSearchElement(titleResult) {
  // Skapar search resultaten.
  const searchResultsElem = document.querySelector("#searchResults");
  const containerElem = document.createElement("article");
  const titleElem = document.createElement("h3");
  const genreElem = document.createElement("p");
  const dateElem = document.createElement("p");

  titleElem.innerText = titleResult.data.title;
  genreElem.innerText = titleResult.data.genre;
  dateElem.innerText = titleResult.data.date;

  containerElem.append(titleElem);
  containerElem.append(genreElem);
  containerElem.append(dateElem);
  searchResultsElem.append(containerElem);
}

function displayTitleResults(results) {
  //Displayar resultaten man hittar, för att undvika att de bara läggs till en ny i min sektion varje gång man söker ny titel använderj ag remove och har en tom article så att den raderas varje gång innan den lägger till ny.
  let containerElem = document.querySelector("article");
  containerElem.remove();
  results.forEach((titleResult) => {
    createTitleSearchElement(titleResult);
  });
}

async function searchTitle(titleSearch) {
  // Query funktion som ställer fråga med krav, allting som uppfyller slängs in i arrayen.
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "movies"), where("title", "==", titleSearch))
    );

    const results = [];

    querySnapshot.forEach((movie) => {
      const titleResult = {
        data: movie.data(),
      };

      results.push(titleResult);
    });

    return results;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return [];
  }
}

export { searchTitleButton, displayTitleResults, searchTitle };
