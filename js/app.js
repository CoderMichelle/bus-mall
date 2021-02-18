'use strict';

// Global Variables
let previousArray = [];
let allProducts = [];
let totalClicks = 0;
let clicksAllowed = 25;
let imageLeft = document.querySelector('section img:first-child');
let imageMiddle = document.querySelector('section img:nth-child(2)');
let imageRight = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
// let myButton = document.querySelector('div');

// Constructor

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
  // let uniqueNumbers = [];
  // let countOfUniqueNumbers = 6;
  // function que() {
  //   while (uniqueNumbers.length < countOfUniqueNumbers) {
  //     let randomNumber = getRandomNumber();
  //     while (!uniqueNumbers.includes(randomNumber)) {
  //       uniqueNumbers.unshift(randomNumber);
  //     }
  //   }
  // }
  while (indexArray[0] === indexArray[1] || indexArray[0] === indexArray[2]) {
    indexArray[0] = getRandomIndex();
    while (indexArray[1] === indexArray[2]) {
      indexArray[1] = getRandomIndex();
      // while (indexArray[2] === indexArray[3] || indexArray[2] === indexArray[4]) {
      // indexArray[2] = getRandomIndex();

      // }
    }
  }


  previousArray = indexArray;
  console.log(previousArray);

  helperRenderImages(imageLeft, indexArray[0]);
  helperRenderImages(imageMiddle, indexArray[1]);
  helperRenderImages(imageRight, indexArray[2]);

}

function helperRenderImages(imageSide, indexNumber) {

  imageSide.src = allProducts[indexNumber].src;
  imageSide.title = allProducts[indexNumber].name;
  allProducts[indexNumber].views++;

}

// function renderResults() {
// let myList = document.querySelector('ul');
// for (let i = 0; i < allProducts.length; i++) {
//   let li = document.createElement('li');
//   li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times`;
//   myList.appendChild(li);
// }
// }

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
    renderChart();
    // renderResults();

  }

  // call chart function
}

// function handleButtonClick(event) {  //disable-eslint-line

//   if (totalClicks === clicksAllowed) {
//     renderResults();
//   }
//   myButton.removeEventListener
//   renderProducts.('click', handleButtonClick);
// }

renderProducts();
let productNames = [];
let productViews = [];
let productClicks = [];

function renderChart() {


  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }
  console.log(allProducts);
  console.log(productNames);
  console.log(productViews);
  console.log(productClicks);

  var chartObject = {
    type: 'bar',
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor:
          'rgba(75, 192, 192, 0.2)',
        borderColor:
          'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  let ctx = document.getElementById('productChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}
myContainer.addEventListener('click', handleClick);

