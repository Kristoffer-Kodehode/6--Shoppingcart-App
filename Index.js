import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL: "https://shopcart-60a1f-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);

const inputEl = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const database = getDatabase(app);
const waresInDB = ref(database, "wares");

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(waresInDB, inputValue);
});
