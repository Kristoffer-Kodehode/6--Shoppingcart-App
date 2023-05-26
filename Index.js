import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  if (snapshot.exists()) {
    let waresArray = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < waresArray.length; i++) {
      let currentItem = waresArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
      appendWaresToList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "Empty";
  }
});

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(waresInDB, inputValue);
  inputClear();
});

function inputClear() {
  inputEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendWaresToList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `wares/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
  shoppingListEl.append(newEl);
}
