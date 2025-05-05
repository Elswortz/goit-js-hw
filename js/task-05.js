const inputRef = document.querySelector("#name-input");
const spanRef = document.querySelector("#name-output");

inputRef.addEventListener("input", onInputChange);

function onInputChange(event) {
  const input = event.currentTarget;
  if (input.value !== "") {
    spanRef.textContent = input.value;
  } else {
    spanRef.textContent = "Anonymous";
  }
}
