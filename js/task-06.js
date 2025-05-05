const inputRef = document.querySelector("#validation-input");

inputRef.addEventListener("blur", onInputBlur);

function onInputBlur(event) {
  const input = event.currentTarget;
  const isValid = input.value.length <= input.dataset.length;
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
}
