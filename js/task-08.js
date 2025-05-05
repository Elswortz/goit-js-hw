const formRef = document.querySelector(".login-form");

formRef.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const login = form.elements.email;
  const password = form.elements.password;

  if (login.value === "" || password.value === "") {
    alert("Всі поля повинні бути заповнені!");
  } else {
    const valueObj = {
      [login.name]: login.value,
      [password.name]: password.value,
    };
    console.log(valueObj);
    form.reset();
  }
}
