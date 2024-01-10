const gridContainer = document.querySelector("#grid-container");
const colorPicker = document.querySelector("#color-picker");
const colorButton = document.querySelector("#color");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear");
const slider = document.querySelector("#slider");
const gridSize = document.querySelector("#grid-size");

currentMode = "color";
let colorMode = true;
let rainbowMode = false;
let eraserMode = false;
let chosenColor = colorPicker.value;
let gridCells;

function createGrid(parent, size) {
	gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let i = 1; i <= size * size; i++) {
		const cell = document.createElement("div");
		cell.classList.add("grid-cell", "border-dotted");
		parent.appendChild(cell);
	}
	gridCells = document.querySelectorAll(".grid-cell");
}

function setColors(e, color) {
	if (currentMode === "rainbow") {
		e.target.style.backgroundColor = generateHexColor();
		adjustBorder(false, e.target);
	} else if (currentMode === "eraser") {
		e.target.style.backgroundColor = "#ffffff";
		adjustBorder(true, e.target);
	} else {
		e.target.style.backgroundColor = color;
		adjustBorder(false, e.target);
	}
}

function addMouseoverListener(e) {
	setColors(e, chosenColor);
}

function adjustBorder(haveBorder, target) {
	if (haveBorder == true) {
		target.classList.add("border-dotted");
		target.classList.remove("border-none");
	} else {
		target.classList.add("border-none");
		target.classList.remove("border-dotted");
	}
}

function pickColor() {
	chosenColor = colorPicker.value;
}

function setMode(mode) {
	currentMode = mode;
}

function generateRandomNumber() {
	return Math.floor(Math.random() * 256);
}

function generateHexColor() {
	var hexColor = "#";
	for (i = 0; i < 3; i++) {
		var num = generateRandomNumber().toString(16);
		if (num.length < 2) {
			num = "0" + num;
		}
		hexColor += num;
	}
	return hexColor;
}

function clearGrid() {
	gridContainer.innerHTML = "";
}

function reloadGrid() {
	clearGrid();
	createGrid(gridContainer, slider.value);
	manageEventListeners(gridCells);
}

function changeGridSize() {
	clearGrid();
	createGrid(gridContainer, slider.value);
	manageEventListeners(gridCells);
	gridSize.textContent = `${slider.value} x ${slider.value}`;
}

function manageEventListeners(gridCells) {
	gridContainer.addEventListener("mousedown", (e) => {
		setColors(e, chosenColor);
		gridCells.forEach((cell) => {
			cell.addEventListener("mouseover", addMouseoverListener);
		});
	});

	window.addEventListener("mouseup", () => {
		gridCells.forEach((cell) => {
			cell.removeEventListener("mouseover", addMouseoverListener);
		});
	});
}

window.onload = () => {
	createGrid(gridContainer, slider.value);
	manageEventListeners(gridCells);
};

colorPicker.addEventListener("input", pickColor);
colorButton.addEventListener("click", () => setMode("color"));
rainbowButton.addEventListener("click", () => setMode("rainbow"));
eraserButton.addEventListener("click", () => setMode("eraser"));
clearButton.addEventListener("click", reloadGrid);
slider.addEventListener("input", changeGridSize);
