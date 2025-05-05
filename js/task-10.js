const inputRef = document.querySelector("input");
const createBtnRef = document.querySelector("[data-create]");
const destroyBtnRef = document.querySelector("[data-destroy]");
const boxRef = document.querySelector("#boxes");

createBtnRef.addEventListener("click", onCreateBtnClick);
destroyBtnRef.addEventListener("click", onDestroyBtnClick);

function onCreateBtnClick(event) {
  createBoxes(inputRef.value);
}

function onDestroyBtnClick(event) {
  destroyBoxes();
}

function destroyBoxes() {
  boxRef.innerHTML = "";
}

function createBoxes(amount) {
  let string = "";
  for (let i = 0, size = 30; i <= amount; i++, size += 10) {
    string += `<div style="width: ${size}px; height: ${size}px; background-color: ${getRandomHexColor()}"></div>`;
  }
  boxRef.insertAdjacentHTML("beforeend", string);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
