let counterValue = 0;
const decBtn = document.querySelector('[data-action="decrement"]');
const incBtn = document.querySelector('[data-action="increment"]');
const counterText = document.querySelector("#value");

decBtn.addEventListener("click", onDecBtnClick);
incBtn.addEventListener("click", onIncBtnClick);

function onDecBtnClick() {
  counterValue -= 1;
  counterText.textContent = counterValue;
}

function onIncBtnClick() {
  counterValue += 1;
  counterText.textContent = counterValue;
}
