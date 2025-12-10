"use strict";

function Book(title, author, read = "unread") {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = read;
}

function addBookToPage(array) {
    const parentElement = document.querySelector("#bookSection");

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    for (let i = 0; i <= array.length - 1; ++i) {
        const newDiv = document.createElement("div");
        const lineBreakOne = document.createElement("br");
        const lineBreakTwo = document.createElement("br");
        const remBtn = document.createElement("button");
        const readBtn = document.createElement("button");

        const bookInformation = document.createTextNode(`${array[i].title} by ${array[i].author}`);
        const readStatus = document.createTextNode(`Status: ${array[i].read}`);
        const remBtnContent = document.createTextNode("Remove Book");
        const readBtnContent = document.createTextNode("Change read status")

        newDiv.appendChild(bookInformation);
        newDiv.appendChild(lineBreakOne);
        newDiv.appendChild(readStatus);
        newDiv.appendChild(lineBreakTwo);
        newDiv.appendChild(readBtn);
        readBtn.appendChild(readBtnContent);
        newDiv.appendChild(remBtn);
        remBtn.appendChild(remBtnContent);
       
        newDiv.dataset.bookId = array[i].id;
        
        const parentDiv = document.querySelector("#bookSection");
        parentDiv.appendChild(newDiv);
    }
}

function addBookToLibrary(title, author, read) {
    const createdBook = new Book(title, author, read);

    console.log(createdBook);
    

    myLibrary.push(createdBook);
}

function removeBook(array, dataAtt) {
    const newLibrary = array.filter((obj) => obj.id != dataAtt);

    return newLibrary;
}

function changeStatus(array, dataAtt) {

    if (array.find((obj) => obj.id == dataAtt && obj.read == "read")) {
        Object.assign(
            array.find((obj) => obj.id == dataAtt),

            {
                read: "unread"
            }
        )
    } else {
        Object.assign(
            array.find((obj) => obj.id == dataAtt),

            {
                read: "read"
            }
        )
    }


    addBookToPage(array)
}

let myLibrary = [];

addBookToLibrary("Moby-Dick", "Herman Melville", "unread");
addBookToLibrary("Homo Faber", "Max Frisch", "read");

const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("button");
const closeDialog = document.querySelector("dialog button");
const bookElement = document.querySelector("#bookSection");

bookElement.addEventListener("click", (e) => {
    
    if (e.target.nodeName == "BUTTON" && e.target.innerText == "Remove Book") {
        
        myLibrary = removeBook(myLibrary, e.target.parentElement.dataset.bookId);

        addBookToPage(myLibrary);
    }

    if (e.target.nodeName == "BUTTON" && e.target.innerText == "Change read status") {
        changeStatus(myLibrary, e.target.parentElement.dataset.bookId);
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