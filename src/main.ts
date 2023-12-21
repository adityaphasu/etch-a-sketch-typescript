const gridContainer = document.querySelector(".grid-container") as HTMLDivElement;
const sliderLabel = document.querySelector(".slider-label") as HTMLLabelElement;
const slider = document.querySelector("#slider") as HTMLInputElement;
const colorPicker = document.querySelector("#color-picker") as HTMLInputElement;
const eraser = document.querySelector(".eraser") as HTMLButtonElement;
const clear = document.querySelector(".clear") as HTMLButtonElement;

let isDrawing = false;
let currentColor = colorPicker.value;

// Color
colorPicker.addEventListener("click", () => setColor(colorPicker.value));
colorPicker.addEventListener("input", () => setColor(colorPicker.value));
eraser.addEventListener("click", () => setColor("white"));

const setColor = (color: string) => {
  currentColor = color;
};

// Drawing
const draw = (event: MouseEvent) => {
  if (!isDrawing) return;

  let currentSelectedItem = event.target as HTMLElement;
  currentSelectedItem.style.backgroundColor = currentColor;
};

// Grid functions
const gridGenerator = (size: number) => {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 1; i <= size ** 2; i++) {
    const gridItem = document.createElement("div");

    gridItem.classList.add("grid-item");

    gridItem.addEventListener("mousedown", () => (isDrawing = true));
    gridItem.addEventListener("mouseup", () => (isDrawing = false));
    gridItem.addEventListener("mousemove", draw);

    gridContainer.appendChild(gridItem);
  }
};

const setGrid = () => {
  const currentGridItems = document.querySelectorAll(".grid-item");

  currentGridItems.forEach((gridItem) => {
    gridItem.remove();
  });

  gridGenerator(slider.valueAsNumber);
};

// Clear button
clear.addEventListener("click", () => setGrid());

// Slider input
slider.addEventListener("input", () => {
  sliderLabel.textContent = `Grid: ${slider.value} x ${slider.value}`;
  setGrid();
});

// Initial setup
setGrid();
