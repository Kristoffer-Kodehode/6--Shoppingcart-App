import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://shopcart-60a1f-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);

const inputEl = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const shoppingListEl = document.getElementById("shopping-list");

const database = getDatabase(app);
const waresInDB = ref(database, "wares");
onValue(waresInDB, function (snapshot) {
  let waresArray = Object.values(snapshot.val());
  clearShoppingListEl;
  for (let i = 0; i < waresArray.length; i++) {
    appendWaresToList(waresArray[i]);
  }
});

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(waresInDB, inputValue);
  inputClear();
  //   appendWaresToList(inputValue);
});

function inputClear() {
  inputEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendWaresToList(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
