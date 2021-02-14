'use strict';

// Global Variables
let allProducts = [];
let totalClicks = 0;
let clicksAllowed = 15;
let imageLeft = document.querySelector('section img:first-child');
let imageMiddle = document.querySelector('section img:nth-child(2)');
let imageRight = document.querySelector('section img:nth-child(3)');

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `assets/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let indexArray = [];
  indexArray[0] = getRandomIndex();
  indexArray[1] = getRandomIndex();
  indexArray[2] = getRandomIndex();
  //  in lab today I recommend using an array.
  // maybe name itindexArray
  // check to see if the index is included in that array
  // pop those results from the array or shift?  maybe?
  while (indexArray[0] === indexArray[1] || indexArray[0] === indexArray[2]) {
    indexArray[0] = getRandomIndex();
    while (indexArray[1] === indexArray[2]) {
      indexArray[1] = getRandomIndex();
    }
  }

  helperRenderImages(imageLeft, indexArray[0]);
  helperRenderImages(imageMiddle, indexArray[1]);
  helperRenderImages(imageRight, indexArray[2]);


  // image[i].src = allProducts[indexArray[i]].src;
  // image[i].title = allProducts[indexArray[i]].name;
  // allProducts[indexArray[i]].views++;

  // imageTwo.src = allProducts[secondProductIndex].src;
  // imageTwo.title = allProductProduc.name;
  // allGoats[secondProductIndex].views++;

}

function helperRenderImages(imageSide, indexNumber) {

  imageSide.src = allProducts[indexNumber].src;
  imageSide.title = allProducts[indexNumber].name;
  allProducts[indexNumber].views++;

  // imageTwo.src = allProducts[secondProductIndex].src;
  // imageTwo.title = allProductProduc.name;
  // allGoats[secondProductIndex].views++;

}

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image and FOLLOW INSTRUCTIONS');
  }

  totalClicks++;
  let ProductClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (ProductClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderProducts();
  if (totalClicks === clicksAllowed) {
    // REMOVE EVENT LISTENER
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event) {  //disable-eslint-line

  if (totalClicks === clicksAllowed) {
    renderResults();
  }
  myButton.removeEventListener('click', handleButtonClick);
}

renderProducts();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);