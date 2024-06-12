import { add } from "./functions.js"
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://test-58573-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingListEl = document.getElementById("shopping-list")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")

function clearInput() {
    inputEl.value = ""
}

onValue(shoppingListInDB, function(snapshot){
    clearList()
    if (snapshot.exists()){
        let listArr = Object.entries(snapshot.val())
    
        for (let i=0; i< listArr.length; i++) {
            let currentItem = listArr[i]
    
            addListItem(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function addListItem(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}

function clearList() {
    shoppingListEl.innerHTML = ""
}


addBtn.addEventListener("click", function(){
    let inputValue = inputEl.value
    if (inputValue.length >=1){
        push(shoppingListInDB, inputValue)
        clearInput()
    }
})


