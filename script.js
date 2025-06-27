const main = document.querySelector(".main");
const body = document.querySelector("body");
const colors = document.querySelector(".colors");
const black = document.querySelector(".black");

let isMouseDown = false;
let selected = null;

let sizeOfCanvas = parseInt(
  prompt("Enter the size of each of the canvas' sides")
);

if (sizeOfCanvas > 100) {
  sizeOfCanvas = 100;
}

if (sizeOfCanvas <= 0 || !sizeOfCanvas) {
  sizeOfCanvas = 32;
}

const userSize = (size) => {
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.style.backgroundColor = "black";
    div.style.opacity = "0";
    div.style.width = `${960 / size}px`;
    div.style.height = `${960 / size}px`;
    main.appendChild(div);
  }
};

userSize(sizeOfCanvas);

main.style.cursor = "crosshair";

const selectColor = (elem) => {
  if (selected) {
    selected.style.transform = "scale(1)";
  }
  elem.style.transform = "scale(1.1)";
  selected = elem;
};

selectColor(black);

const paintSquare = (elem) => {
  if (parseFloat(elem.style.opacity) >= 1) {
    return;
  }
  elem.style.backgroundColor = selected.getAttribute("class");
  elem.style.opacity = `${parseFloat(elem.style.opacity) + 0.1}`;
};

colors.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target != colors) {
    selectColor(event.target);
  }
});

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
