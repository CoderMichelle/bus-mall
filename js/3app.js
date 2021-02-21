'use strict';

// Global Variables
let indexArray = [];
let allProducts = [];
let totalClicks = 0;
let clicksAllowed = 25;
let uniqueImageCount = 6;
let productClicked = 0;

let firstImage = document.querySelector('section img:first-child');
let secondImage = document.querySelector('section img:nth-child(2)');
let thirdImage = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `assets/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

var retrieveProducts = localStorage.getItem('products');
if (retrieveProducts) {
  let parsedProducts = JSON.parse(retrieveProducts);
  allProducts = parsedProducts;
} else {
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
}
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function imgAssignments(imageElement, imageIndex) {
  imageElement.src = allProducts[imageIndex].src;
  imageElement.title = allProducts[imageIndex].name;
  allProducts[imageIndex].views++;
}
function renderProducts() {
  while (indexArray.length < uniqueImageCount) {
    let randomIndex = getRandomIndex();
    while (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }
  let firstProductIndex = indexArray.shift();
  let secondProductIndex = indexArray.shift();
  let thirdProductIndex = indexArray.shift();

  imgAssignments(firstImage, firstProductIndex);
  imgAssignments(secondImage, secondProductIndex);
  imgAssignments(thirdImage, thirdProductIndex);

}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image');
  }
  totalClicks++;
  productClicked = event.target.title;
  console.log(productClicked);

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
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
  let stringifiedProducts = JSON.stringify(allProducts);
  // console.log(stringifiedProducts);
  localStorage.setItem('products', stringifiedProducts);
}

renderProducts();
if (totalClicks === clicksAllowed) {
  myContainer.removeEventListener('click', handleClick);
  let anotherContainer = document.getElementById('container');
  anotherContainer.style.display = 'block';
  renderChart();

}
renderProducts();

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  var chartObject = {
    type: 'bar',
    data: {
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
