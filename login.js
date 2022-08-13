'use strict';
const wrap = document.querySelector("#wrap");
const loginWrap = document.querySelector('#loginWrap');
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBut = document.querySelector("#loginBut");
const loginForm = document.querySelector("#login");
const startId = document.querySelector("#startId");
const startPassword = document.querySelector("#startPassword");
const startBut = document.querySelector("#startBut");
const startForm = document.querySelector("#start");

let korea = /[^a-z0-9]/;
let koreaPassword = /[^a-z0-9A-Z]/;

const error = document.createElement('p');
loginForm.after(error);

let idPassword = [];
function loginIdFunc(e) {
  console.log(e.target.value);
  const koreaTest = korea.test(e.target.value);
  console.log(koreaTest);
  if (koreaTest) {
    error.textContent = '소문자,숫자만 입력가능합니다!';
    if (e.target.value.length === 0) {
      error.textContent = '';
    }
  }
  if (koreaTest === false) {
    error.textContent = '가능합니다!';
    loginForm.after(error);
    if (e.target.value.length === 0) {
      error.textContent = '';
    }
  }
}
function loginPasswordFunc(e) {
  console.log(e.target.value);
  const koreaTest = korea.test(e.target.value);
  console.log(koreaTest);
  if (koreaTest) {
    error.textContent = '소문자,대문자,숫자만 입력가능합니다!';
    if (e.target.value.length === 0) {
      error.textContent = '';
    }
  }
  if (koreaTest === false) {
    error.textContent = '가능합니다!';
    loginForm.after(error);
    if (e.target.value.length === 0) {
      error.textContent = '';
    }
  }
}
function loginButFunc() {
  const idPassWords = JSON.parse(localStorage.getItem("login_key"));
  const clientIdPassword = idPassWords.find((idPassWord) => idPassWord.loginId == id.value);
  console.log(clientIdPassword);
  if(clientIdPassword){
    wrap.removeAttribute("style", "display:none");
    loginWrap.setAttribute("style","display:none");
  }
  password.value = "";
  id.value = "";
  error.textContent = '';
}
function startIdFunc(e) {
  const idContent = e.target.value;
  const koreaTest = korea.test(idContent);
  if (koreaTest) {
    error.textContent = '소문자,숫자만 입력가능합니다!';
    if (idContent.length === 0) {
      error.textContent = '';
    }
  }
  if (koreaTest === false) {
    error.textContent = '가능합니다!';
    startForm.after(error);
    if (idContent.length === 0) {
      error.textContent = '';
    }
  }
}
function startPasswordFunc(e) {
  const passwordContent = e.target.value;
  const koreaTest = korea.test(passwordContent);
  if (koreaTest) {
    error.textContent = '소문자,대문자,숫자만 입력가능합니다!';
    if (passwordContent.length === 0) {
      error.textContent = '';
    }
  }
  if (koreaTest === false) {
    error.textContent = '가능합니다!';
    startForm.after(error);
    if (passwordContent.length === 0) {
      error.textContent = '';
    }
  }
}
function startButFunc() {
  const objectStart = {
    "loginId": startId.value,
    "loginPassword": startPassword.value,
    "id": Date.now(),
  };
  idPassword.push(objectStart);
  const ArrayString = JSON.stringify(idPassword);
  localStorage.setItem("login_key", ArrayString);
  startPassword.value = "";
  startId.value = "";
  error.textContent = '';
}
//새로고침
const loginArray = JSON.parse(localStorage.getItem("login_key"));
if (loginArray) {
  idPassword = loginArray;
  console.log(idPassword);
}

id.addEventListener('input', loginIdFunc);
password.addEventListener('input', loginPasswordFunc);
loginBut.addEventListener('click', loginButFunc);
startId.addEventListener('input', startIdFunc);
startPassword.addEventListener('input', startPasswordFunc);
startBut.addEventListener('click', startButFunc);