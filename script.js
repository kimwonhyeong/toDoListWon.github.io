'use strict';
const clockDiv =document.querySelector("#clock");
const clock = document.querySelector("#clock h2");
const day = document.querySelector("#clock h4");


//1번 함수 현재 시간 받아서 우리 맛대로 바꿔서 화면에 적용하기
function timeChange(){
  const nowTime =new Date();
  const hour=String(nowTime.getHours()).padStart(2,"0");
  const minute=String(nowTime.getMinutes()).padStart(2,"0");
  const second=String(nowTime.getSeconds()).padStart(2,"0");
  clock.innerText=`${hour}:${minute}:${second}`;
}
timeChange();
//1번 함수 1초 마다 갱신시키기
setInterval(timeChange,1000);