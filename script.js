const main = document.querySelector(".main");
const body = document.querySelector("body");
const colors = document.querySelector(".colors");
const black = document.querySelector(".black");
const gridButton = document.querySelector(".button");
const resetButton = document.querySelector(".resetbutton");
const colorPicker = document.querySelector(".colorPicker");
const gridSizeDisplay = document.querySelector(".grid-size-display");

let isMouseDown = false;
let selected = null;
let currColor = "black";

const updateGridSizeText = (size) => {
  gridSizeDisplay.innerText = `Tamanho da grade: ${size} x ${size}`;
};

const userSize = (size) => {
  main.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.style.backgroundColor = "black";
    div.style.opacity = "0";
    div.style.width = `${960 / size}px`;
    div.style.height = `${960 / size}px`;
    main.appendChild(div);
  }
  updateGridSizeText(size);
};

userSize(16);

main.style.cursor = "crosshair";

const selectColor = (elem) => {
  if (selected) {
    selected.classList.remove("selected");
  }
  elem.classList.add("selected");
  selected = elem;
  if (elem.getAttribute("name") === "colorPicker") {
    currColor = elem.value;
    return;
  }
  currColor = selected.getAttribute("class").split(" ")[0];
};

selectColor(black);

const paintSquare = (elem) => {
  elem.style.backgroundColor = currColor;
  if (currColor === "white" || currColor === "#ffffff") {
    elem.style.opacity = "0";
    return;
  }
  if (parseFloat(elem.style.opacity) >= 1) {
    return;
  }
  elem.style.opacity = `${parseFloat(elem.style.opacity) + 0.1}`;
};

colors.addEventListener("click", (event) => {
  if (event.target != colors) {
    selectColor(event.target);
  }
});

const handlePickerSelection = (event) => {
  selectColor(event.target);
};

colorPicker.addEventListener("input", (event) => handlePickerSelection(event));

colorPicker.addEventListener("click", (event) => handlePickerSelection(event));

main.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  if (event.target !== main) {
    paintSquare(event.target);
  }
});

body.addEventListener("mouseup", () => (isMouseDown = false));

main.addEventListener("mouseover", (event) => {
  if (isMouseDown && event.target !== main) {
    paintSquare(event.target);
  }
});

gridButton.addEventListener("click", () => {
  const sizeOfCanvas = parseInt(
    prompt("Enter the size of each of the canvas' sides")
  );
  if (!sizeOfCanvas) {
    return;
  }
  if (sizeOfCanvas > 100) {
    sizeOfCanvas = 100;
  }
  if (sizeOfCanvas <= 0) {
    sizeOfCanvas = 32;
  }
  userSize(sizeOfCanvas);
});

resetButton.addEventListener("click", () => {
  const squares = document.querySelectorAll(".main div");
  squares.forEach((square) => (square.style.opacity = "0"));
});
