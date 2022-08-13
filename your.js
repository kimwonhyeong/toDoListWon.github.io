'use strict';
const nameButton = document.querySelector('#nameButton');
const nameSubmit = document.querySelector('#nameSubmitForm');
function nameShow(e){
  e.preventDefault();
  const name = document.createElement("h3");
  name.textContent = `환영합니다! ${nameInput.value} 병사님`;
  submit.parentElement.before(name);
  nameInput.value='';
  nameSubmit.setAttribute('style','display:none');
  name.classList.add('nameStyle');
}

nameButton.addEventListener('click',nameShow);