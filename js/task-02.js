const ingredients = [
  "Potatoes",
  "Mushrooms",
  "Garlic",
  "Tomatos",
  "Herbs",
  "Condiments",
];

const makeIngredients = (ingredients) => {
  const element = ingredients.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("item");
    return li;
  });

  const listRef = document.querySelector("#ingredients");
  listRef.append(...element);
};

makeIngredients(ingredients);
