'use strict';
const background = document.querySelector("#background img");

const pictures=[
  "0.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg"
];
const rand = Math.floor(Math.random()*(3-0+1)+0);


background.setAttribute('src', pictures[rand]);