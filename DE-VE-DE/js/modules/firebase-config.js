// Gjort en modul för firebase-config eftersom det är lättare att hitta firebase configen och skicka vidare DB till alla andra moduler som kommer använda den.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANc1VCRV-4QSJV503xjgRikmJ57Uf7wUk",
  authDomain: "de-ve-de-63123.firebaseapp.com",
  projectId: "de-ve-de-63123",
  storageBucket: "de-ve-de-63123.appspot.com",
  messagingSenderId: "362935995833",
  appId: "1:362935995833:web:150b9a2301e455daf1ba68",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebaseConfig };
