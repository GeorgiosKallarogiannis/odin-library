"use strict";

function Book(title, author, pageNumber, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

Book.prototype.changeStatus = function () {
  this.read = !this.read;
};

function addBookToPage(array) {
  const parentElement = document.querySelector("#bookSection");

  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  for (let i = 0; i <= array.length - 1; ++i) {
    const newDiv = document.createElement("div");
    const lineBreakOne = document.createElement("br");
    const lineBreakTwo = document.createElement("br");
    const lineBreakThree = document.createElement("br");
    const remBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    readBtn.classList.add("change-state");

    const bookInformation = document.createTextNode(
      `${array[i].title} by ${array[i].author}`
    );

    const bookPages = document.createTextNode(`Pages: ${array[i].pageNumber}`);

    const read = array[i].read ? "Read" : "Unread";

    const readStatus = document.createTextNode(`${read}`);
    const remBtnContent = document.createTextNode("Remove Book");
    const readBtnContent = document.createTextNode("Change read status");

    newDiv.appendChild(bookInformation);
    newDiv.appendChild(lineBreakOne);
    newDiv.appendChild(bookPages);
    newDiv.appendChild(lineBreakTwo);
    newDiv.appendChild(readStatus);
    newDiv.appendChild(lineBreakThree);
    newDiv.appendChild(readBtn);
    readBtn.appendChild(readBtnContent);
    newDiv.appendChild(remBtn);
    remBtn.appendChild(remBtnContent);

    newDiv.dataset.bookId = array[i].id;

    const parentDiv = document.querySelector("#bookSection");
    parentDiv.appendChild(newDiv);
  }
}

function addBookToLibrary(title, author, pageNumber, read) {
  const createdBook = new Book(title, author, pageNumber, read);

  console.log(createdBook);

  myLibrary.push(createdBook);
}

function removeBook(array, dataAtt) {
  const newLibrary = array.filter((obj) => obj.id != dataAtt);

  return newLibrary;
}

let myLibrary = [];

const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("button");
const closeDialog = document.querySelector("dialog button");
const bookElement = document.querySelector("#bookSection");

bookElement.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON" && e.target.innerText == "Remove Book") {
    myLibrary = removeBook(myLibrary, e.target.parentElement.dataset.bookId);

    addBookToPage(myLibrary);
  }

  if (
    e.target.nodeName == "BUTTON" &&
    e.target.innerText == "Change read status"
  ) {
    for (let book in myLibrary) {
      if (myLibrary[book].id == e.target.parentElement.dataset.bookId) {
        myLibrary[book].changeStatus();
        addBookToPage(myLibrary);
      }
    }
  }
});

const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pageNumberInput = document.querySelector("#pageNumber");
const readStatusInput = document.querySelector("#readStatus");

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", (e) => {
  e.preventDefault();

  const titleInputVal = titleInput.value;
  const authorInputVal = authorInput.value;
  const pageNumberInputVal = pageNumberInput.value;
  const readStatusInputVal = readStatusInput.checked;

  addBookToLibrary(
    titleInputVal,
    authorInputVal,
    pageNumberInputVal,
    readStatusInputVal
  );

  addBookToPage(myLibrary);

  dialog.close();
});

addBookToPage(myLibrary);
