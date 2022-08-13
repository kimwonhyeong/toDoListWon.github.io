'use strict';
const today = document.querySelector('#today');
const tomorrow = document.querySelector('#tomorrow');
const input = document.querySelector("#input");
const button = document.querySelector("#button");
const ListDay = document.querySelector("#ListDay");
const ListMor = document.querySelector("#ListMor");
const todayButton1 = document.querySelector("#showBut");
const todayButton2 = document.querySelector("#NoShowBut");
const MorButton1 = document.querySelector("#showButTomorr");
const MorButton2 = document.querySelector("#NoShowButTomorr");
const toDoUl = document.querySelector("#ListDay ul");
const toDoUl2 = document.querySelector("#ListMor ul");
const toDoUlTomorr = document.querySelector("#ListMor ul");


//------------------------------------------------------------------
let toDoListArrays = [];
let toDoListArrays2 = [];

//새로고침했을 때 할 일 보이게 하고 싶어요..!!
const todayArray = JSON.parse(localStorage.getItem("today_key"));
const tomorrowArray = JSON.parse(localStorage.getItem("tomorrow_key"));
if (todayArray) {
  toDoListArrays = todayArray;
  toDoListArrays.forEach(toDoListWriteLoading);
}
if (tomorrowArray) {
  toDoListArrays2 = tomorrowArray;
  toDoListArrays2.forEach(toDoListWriteLoading);
}
//1-2새로고침 화면에 삽입하기
function toDoListWriteLoading(toDoValue) {
  const toDoLi = document.createElement("li");
  const toDo = document.createElement("span");
  const removeBtn = document.createElement("button");
  toDo.textContent = toDoValue.text;
  removeBtn.textContent = "🗑️";
  removeBtn.setAttribute("style", "display:none");
  if (toDoListArrays === todayArray) {
    toDoUl.append(toDoLi);
  }
  if (toDoListArrays2 === tomorrowArray) {
    toDoUl2.append(toDoLi);
  }
  toDoLi.prepend(toDo);
  toDoLi.append(removeBtn);
  toDoLi.id = toDoValue.id;
  toDo.addEventListener('click',(e)=>{
    toDo.classList.toggle('done');
  });
  toDo.classList.add('pointer');
  toDoLi.addEventListener('mouseenter', showRemoveBtn);
  toDoLi.addEventListener('mouseleave', NoShowRemoveBtn);
  removeBtn.addEventListener('click', toDoRemove);
}
//------------------------------------------------------------------
//1기본 함수
function toDoListHandle(e) {
  e.preventDefault();
  const toDoValue = {
    "text": input.value,
    "id": Date.now(),
  }
  let radioValue = document.querySelector('input[name="to"]:checked').value;
  if (radioValue === "today") {
    localStorages(toDoValue);
    toDoListWrite(toDoValue, toDoUl);
    console.log(1);
  };
  if (radioValue === "tomorrow") {
    localStorages2(toDoValue);
    toDoListWrite(toDoValue, toDoUl2);
    console.log(2);
  }
  input.value = "";
}
//1-1저장소 넣기
function localStorages(toDoValue) {
  toDoListArrays.push(toDoValue);
  const ArrayString = JSON.stringify(toDoListArrays);
  localStorage.setItem("today_key", ArrayString);
}
//오늘 할 일 보여주기
function showListDay() {
  todayButton1.removeAttribute("style", "display:block");
  todayButton1.setAttribute("style", "display:none");
  todayButton2.removeAttribute("style", "display:none");
  todayButton2.setAttribute("style", "display:block");
  toDoUl.removeAttribute("style", "display:none");
  toDoUl.setAttribute("style", "display:block");
}
//오늘 할 일 가리기
function NoshowListDay() {
  todayButton1.removeAttribute("style", "display:none");
  todayButton1.setAttribute("style", "display:block");
  todayButton2.removeAttribute("style", "display:block");
  todayButton2.setAttribute("style", "display:none");
  toDoUl.removeAttribute("style", "display:block");
  toDoUl.setAttribute("style", "display:none");
}
//--------------------------------------------------------------
//내일 할 일 보이기 & 가리기
function showListDayTomorr() {
  MorButton1.removeAttribute("style", "display:block");
  MorButton1.setAttribute("style", "display:none");
  MorButton2.removeAttribute("style", "display:none");
  MorButton2.setAttribute("style", "display:block");
  toDoUlTomorr.removeAttribute("style", "display:none");
  toDoUlTomorr.setAttribute("style", "display:block");
}
function NoshowListDayTomorr() {
  MorButton1.removeAttribute("style", "display:none");
  MorButton1.setAttribute("style", "display:block");
  MorButton2.removeAttribute("style", "display:block");
  MorButton2.setAttribute("style", "display:none");
  toDoUlTomorr.removeAttribute("style", "display:block");
  toDoUlTomorr.setAttribute("style", "display:none");
}
//내일자 로컬스톨지 키에 저장
function localStorages2(toDoValue) {
  toDoListArrays2.push(toDoValue);
  const ArrayString = JSON.stringify(toDoListArrays2);
  localStorage.setItem("tomorrow_key", ArrayString);
}
//--------------------------------------------------------------
//1-2입력 후 화면에 삽입하기
function toDoListWrite(toDoValue, ul) {
  const toDoLi = document.createElement("li");
  const toDo = document.createElement("span");
  const removeBtn = document.createElement("button");
  toDo.textContent = toDoValue.text;
  removeBtn.textContent = "🗑️";
  ul.append(toDoLi);
  toDoLi.prepend(toDo);
  toDoLi.append(removeBtn);
  removeBtn.setAttribute("style", "display:none");
  toDoLi.id = toDoValue.id;
  toDo.addEventListener('click',(e)=>{
    toDo.classList.toggle('done');
  });
  toDo.classList.add('pointer');
  toDoLi.addEventListener('mouseenter', showRemoveBtn);
  toDoLi.addEventListener('mouseleave', NoShowRemoveBtn);
  removeBtn.addEventListener('click', toDoRemove);
}
function showRemoveBtn(e) {
  const removeBtn = e.target.children[1];
  console.log(removeBtn);
  removeBtn.setAttribute('style', 'display:inline-block');
}
function NoShowRemoveBtn(e) {
  const removeBtn = e.target.children[1];
  console.log(removeBtn);
  removeBtn.setAttribute('style', 'display:none');
}
//제거 함수
function toDoRemove(e) {
  const paintLi = e.target.parentElement;
  const listDayOrMor = paintLi.parentElement.parentElement;
  paintLi.remove();
  if (listDayOrMor === ListDay) {
    toDoListArrays = toDoListArrays.filter((toDoListArray) => toDoListArray.id !== parseInt(paintLi.id));
    const ArrayString = JSON.stringify(toDoListArrays);
    localStorage.setItem("today_key", ArrayString);
  }
  if (listDayOrMor === ListMor) {
    toDoListArrays2 = toDoListArrays2.filter((toDoListArray) => toDoListArray.id !== parseInt(paintLi.id));
    const ArrayString = JSON.stringify(toDoListArrays2);
    localStorage.setItem("tomorrow_key", ArrayString);
  }
}
//------------------------------------------------------------------
todayButton1.addEventListener("click", showListDay);
todayButton2.addEventListener("click", NoshowListDay);
MorButton1.addEventListener("click", showListDayTomorr);
MorButton2.addEventListener("click", NoshowListDayTomorr);
button.addEventListener("click", toDoListHandle);