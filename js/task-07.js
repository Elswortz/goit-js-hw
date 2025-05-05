const inputRef = document.querySelector("#font-size-control");
const spanRef = document.querySelector("#text");

inputRef.addEventListener("input", onInputChange);

function onInputChange(event) {
  const input = event.currentTarget;
  spanRef.style.fontSize = `${input.value}px`;
}
