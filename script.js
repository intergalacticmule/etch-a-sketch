const gridContainer = document.querySelector("#grid-container");
const colorPicker = document.querySelector("#color-picker");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");

let rainbowMode = false;
let eraserMode = false;
let chosenColor = colorPicker.value;
let gridCells;

function createGrid(parent, size) {
	for (let i = 1; i <= size * size; i++) {
		const cell = document.createElement("div");
		cell.classList.add("grid-cell");
		cell.style.height = `${gridContainer.clientHeight / size}px`;
		cell.style.width = `${gridContainer.clientWidth / size}px`;
		cell.classList.add("border-dotted");
		parent.append(cell);
	}
	gridCells = document.querySelectorAll(".grid-cell");
}

createGrid(gridContainer, 16);

function setColors(e, color) {
	if (rainbowMode === true) {
		e.target.style.backgroundColor = generateHexColor();
		adjustBorder(false, e.target);
	} else if (eraserMode == true) {
		e.target.style.backgroundColor = "#ffffff";
		adjustBorder(true, e.target);
	} else {
		e.target.style.backgroundColor = color;
		adjustBorder(false, e.target);
	}
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

function mouseoverEventListener(e) {
	setColors(e, chosenColor);
}

function changeColorFromColorPicker() {
	rainbowMode = false;
	chosenColor = colorPicker.value;
}

function toggleRainbowMode() {
	if (rainbowMode === false) {
		rainbowMode = true;
		eraserMode = false;
	} else {
		rainbowMode = false;
	}
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

function toggleEraserMode() {
	if (eraserMode === false) {
		eraserMode = true;
		rainbowMode = false;
	} else {
		eraserMode = false;
	}
}

function manageEventListeners(gridCells) {
	gridContainer.addEventListener("mousedown", (e) => {
		setColors(e, chosenColor);
		gridCells.forEach((cell) => {
			cell.addEventListener("mouseover", mouseoverEventListener);
		});
	});

	window.addEventListener("mouseup", () => {
		gridCells.forEach((cell) => {
			cell.removeEventListener("mouseover", mouseoverEventListener);
		});
	});
}

colorPicker.addEventListener("input", changeColorFromColorPicker);
rainbowButton.addEventListener("click", toggleRainbowMode);
eraserButton.addEventListener("click", toggleEraserMode);

manageEventListeners(gridCells);
