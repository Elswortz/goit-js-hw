var throttle = require('lodash.throttle');

const DATA_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputChange, 500));
form.addEventListener('submit', onSubmit);
window.addEventListener('DOMContentLoaded', OnDomLoaded);

console.dir(form);

function OnDomLoaded() {
  const savedData = JSON.parse(localStorage.getItem(DATA_KEY));
  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      const field = form.elements[name];
      if (field) field.value = value;
    });
  }
}

function onInputChange(event) {
  const { name, value } = event.target;
  const savedData = JSON.parse(localStorage.getItem(DATA_KEY)) || {};

  savedData[name] = value;

  const isEmpty = !savedData.email?.trim() && !savedData.message?.trim();

  if (isEmpty) {
    localStorage.removeItem(DATA_KEY);
  } else {
    localStorage.setItem(DATA_KEY, JSON.stringify(savedData));
  }
}

function onSubmit(event) {
  event.preventDefault();

  const dataObj = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value,
  };
  console.log(dataObj);

  localStorage.removeItem(DATA_KEY);
  event.currentTarget.reset();
}
