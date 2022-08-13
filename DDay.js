'use strict';
const DDayInput1 = document.querySelector('#DDayInput1');
const DDayInput2 = document.querySelector('#DDayInput2');
const DDayInput3 = document.querySelector('#DDayInput3');
const DDayBut = document.querySelector('#DDayBut');
const DDay2 = document.querySelector('#DDayDiv span');
const DDayForm = document.querySelector('#DDayDiv form');
const DDay = document.querySelector('#DDayDiv h1');
function endInput(e) {
  e.preventDefault();
  const endYear = DDayInput1.value;
  const endMonth = DDayInput2.value;
  const endDay = DDayInput3.value;
  const end = new Date(endYear, endMonth - 1, endDay).getTime();
  DDayForm.remove();
  let interval = setInterval(() => {
    const distance = end - Date.now();
    const days = distance / (1000 * 3600 * 24);
    const hours = (distance % (1000 * 3600 * 24)) / (1000 * 3600);
    const minutes = (distance % (1000 * 3600)) / (1000 * 60);
    const seconds = (distance % (1000 * 60)) / (1000);
    DDay.textContent = `D-Day ${Math.floor(days)}일`;
    DDay2.textContent = `${Math.floor(hours)}시간 ${Math.floor(minutes)}분 ${Math.floor(seconds)}초`;
    if(distance === 0){
      clearInterval(interval);
    }
  }, 1000, end);
}

DDayBut.addEventListener('click', endInput);