'use strict';
const vacationSubmitForm = document.querySelector('#vacationSubmitForm');
const vacationSubmit = document.querySelector('#vacationSubmit');
const vacationInput = document.querySelector('#vacationInput');
const vacationButton = document.querySelector('#vacationButton');
const showButVaction = document.querySelector('#showButVaction');
const NoShowButVaction = document.querySelector('#NoShowButVaction');
const vacation = document.querySelector('#vacation');
const toDoUlVaction = document.querySelector('#vacation ul');
//------------------------------------------------------------------
let vacationArrays = [];

//새로고침했을 때 할 일 보이게 하고 싶어요..!!
const vacationArray = JSON.parse(localStorage.getItem("vacation_key"));
if(vacationArray){
  vacationArrays = vacationArray;
  vacationArrays.forEach(vacationWrite); 
}
//------------------------------------------------------------------
//1기본 함수
function vacationHandle(e) {
  e.preventDefault();
  const toDoValue = {
    "text": vacationInput.value,
    "id": Date.now(),
  }
  localStoragesVacation(toDoValue);
  vacationWrite(toDoValue);
  vacationInput.value = "";
}
//1-1저장소 넣기
function localStoragesVacation(toDoValue) {
  vacationArrays.push(toDoValue);
  const ArrayString = JSON.stringify(vacationArrays);
  localStorage.setItem("vacation_key", ArrayString);
}
//오늘 할 일 보여주기
function showVacation() {
  showButVaction.removeAttribute("style", "display:block");
  showButVaction.setAttribute("style", "display:none");
  NoShowButVaction.removeAttribute("style", "display:none");
  NoShowButVaction.setAttribute("style", "display:block");
  toDoUlVaction.removeAttribute("style", "display:none");
  toDoUlVaction.setAttribute("style", "display:block");
}
//오늘 할 일 가리기
function NoshowVacation() {
  showButVaction.removeAttribute("style", "display:none");
  showButVaction.setAttribute("style", "display:block");
  NoShowButVaction.removeAttribute("style", "display:block");
  NoShowButVaction.setAttribute("style", "display:none");
  toDoUlVaction.removeAttribute("style", "display:block");
  toDoUlVaction.setAttribute("style", "display:none");
}
//--------------------------------------------------------------
//1-2입력 후 화면에 삽입하기
function vacationWrite(toDoValue) {
  const toDoLi = document.createElement("li");
  const toDo = document.createElement("span");
  const removeBtn = document.createElement("button");
  toDo.textContent = toDoValue.text;
  removeBtn.textContent = "🗑️";
  toDoUlVaction.append(toDoLi);
  toDoLi.prepend(toDo);
  toDoLi.append(removeBtn);
  removeBtn.setAttribute("style", "display:none");
  toDoLi.id = toDoValue.id;
  toDo.addEventListener('click', (e) => {
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
  paintLi.remove();
  vacationArrays = vacationArrays.filter((vacationArray) => vacationArray.id !== parseInt(paintLi.id));
  const ArrayString = JSON.stringify(vacationArrays);
  localStorage.setItem("vacation_key", ArrayString);
}
//------------------------------------------------------------------
showButVaction.addEventListener("click", showVacation);
NoShowButVaction.addEventListener("click", NoshowVacation);
vacationButton.addEventListener("click", vacationHandle);