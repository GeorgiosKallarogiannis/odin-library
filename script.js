"use strict";

function Book(title, author) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
}

function addBookToPage(array) {
    const parentElement = document.querySelector("#bookSection");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    for (let i = 0; i <= array.length - 1; ++i) {
        const newDiv = document.createElement("div");
        const remBtn = document.createElement("button");

        const newDivContent = document.createTextNode(`${array[i].title} by ${array[i].author}`);
        const remBtnContent = document.createTextNode("Remove Book");

        newDiv.appendChild(newDivContent);
        newDiv.appendChild(remBtn);
        remBtn.appendChild(remBtnContent);

        newDiv.dataset.bookId = array[i].id;
        
        const parentDiv = document.querySelector("#bookSection");
        parentDiv.appendChild(newDiv);

    }
}

function addBookToLibrary(title, author) {
    const createdBook = new Book(title, author)

    console.log(createdBook);
    

    myLibrary.push(createdBook);
}

function removeBook(array, dataAtt) {
    const newLibrary = array.filter((obj) => obj.id != dataAtt);

    return newLibrary;
}

const myLibrary = [];

addBookToLibrary("Moby-Dick", "Herman Melville");
addBookToLibrary("Homo Faber", "Max Frisch");

const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("button");
const closeDialog = document.querySelector("dialog button");
const removeButton = document.querySelector("#bookSection");

removeButton.addEventListener("click", (e) => {
    if (e.target.nodeName == "BUTTON") {
        

        console.log(removeBook(myLibrary, e.target.parentElement.dataset.bookId))
        
    }
})


const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");

showDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", (e) => {
    e.preventDefault();
    
    const titleInputVal = titleInput.value;
    const authorInputVal = authorInput.value;
    
    addBookToLibrary(titleInputVal, authorInputVal);
    addBookToPage(myLibrary);

    dialog.close();
})


addBookToPage(myLibrary);