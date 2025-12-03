"use strict";

const myLibrary = [];

function Book(title, author) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
}

function addBookToLibrary(title, author) {
    const createdBook = new Book(title, author)

    myLibrary.push(createdBook);
}

addBookToLibrary("Moby-Dick", "Herman Melville");
addBookToLibrary("Homo Faber", "Max Frisch");


function addBookToPage(array) {
    for (let i = 0; i <= array.length - 1; ++i) {
        console.log(array[i]);
        const newDiv = document.createElement("div");
        const newDivContent = document.createTextNode(`${array[i].title} by ${array[i].author}`);
        newDiv.appendChild(newDivContent);
        
        const htmlBody = document.querySelector("body");
        htmlBody.appendChild(newDiv);

    }
}

addBookToPage(myLibrary);