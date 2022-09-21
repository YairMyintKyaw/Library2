const inputElements = document.getElementsByTagName("input");
const bookName = inputElements[0];
const authorName = inputElements[1];
const totalPageNumber = inputElements[2];
const isRead = inputElements[3];
const addButton = document.querySelector(".addButton");
const resetButton = document.querySelector(".resetButton")
const form = document.querySelector("form");

const BookCard = document.querySelector(".BookCard");  

let myLibrary;
if(localStorage.getItem("Books")==null) {
    myLibrary=[];
}
else {
    myLibrary = JSON.parse(localStorage.getItem("Books"));
    //create cards for all books in library
    myLibrary.forEach((book)=>{
        BookCard.append(createCard(book));
    })
}
// create cards for books in local storage
addButton.addEventListener("click",()=>{
    if(form.checkValidity()){
        console.log('it is clicked')
        const book = new Book(bookName.value,
            authorName.value!==""?authorName.value:"Annonymous",
            totalPageNumber.value!=="" && !(+totalPageNumber.value<1)?totalPageNumber.value:"Unknown",
            isRead.checked);
        myLibrary.push(book);
        localStorage.setItem("Books",JSON.stringify(myLibrary));
        BookCard.append(createCard(book))
        resetButton.click();
    }
})

//constructure
function Book(name, author, totalPageNumber, isRead){
    this.name=name;
    this.author=author;
    this.totalPageNumber=totalPageNumber;
    this.isRead=isRead;
}

function createCard(book){
    const cardContainer = document.createElement("div");
    cardContainer.className="cardConotainer";

    const deleteButton = document.createElement("div");
    deleteButton.classList="deleteButton";

    const deleteLineOne = document.createElement("div");
    const deleteLineTwo = document.createElement("div");
    //Add classes
    deleteLineOne.classList = "deleteLineOne line";
    deleteLineTwo.classList = "deleteLineTwo line";

    //append
    deleteButton.append(deleteLineOne,deleteLineTwo);
    
    deleteButton.addEventListener("click",()=>{
        cardContainer.remove();
        let index = myLibrary.findIndex((books)=>books.name==book.name && books.author==book.author);
        myLibrary.splice(index,1)
        localStorage.setItem("Books",JSON.stringify(myLibrary))
    });
    
    
    cardContainer.innerHTML+= `
        <h1 class="title">${book.name}</h1>
        <div class="author">Author: ${book.author}</div>
        <div class="totalPageNumber">Total Pages: ${book.totalPageNumber}</div>
    `
    const button = document.createElement("button");
    button.textContent=book.isRead?"You have finished":"You haven't finished";
    button.classList=book.isRead?"finished":"notFinished";
    button.addEventListener("click",()=>{
        button.textContent=book.isRead?"You haven't finished":"You have finished";
        if(book.isRead){
            book.isRead=false;
            button.className="notFinished";
        }else{
            book.isRead=true;
            button.className="finished";
        }
        myLibrary.forEach((books)=>{
            if(books.name==book.name && books.author==book.author){
                books.isRead= book.isRead;
            }
        })
        localStorage.setItem("Books",JSON.stringify(myLibrary))
    })
    cardContainer.prepend(deleteButton);
    cardContainer.append(button);

    return cardContainer;
}

