const gridContainer = document.querySelector("#grid-container");
let gridCells;

gridContainer.style.border = "1px solid black";

function createGrid(parent, size) {
	for (let i = 1; i <= size * size; i++) {
		const cell = document.createElement("div");
		cell.classList.add("grid-cell");
		cell.style.height = `${gridContainer.clientHeight / size}px`;
		cell.style.width = `${gridContainer.clientWidth / size}px`;
		parent.append(cell);
	}
	gridCells = document.querySelectorAll(".grid-cell");
}

createGrid(gridContainer, 20);

function setColor(e) {
	e.target.style.backgroundColor = "black";
}

function manageEventListeners(gridCells) {
	gridContainer.addEventListener("mousedown", () => {
		gridCells.forEach((cell) => {
			cell.addEventListener("mouseover", setColor);
		});
	});
	window.addEventListener("mouseup", () => {
		gridCells.forEach((cell) =>
			cell.removeEventListener("mouseover", setColor)
		);
	});
}

manageEventListeners(gridCells);
