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

createGrid(gridContainer, 16);

function setColor(e, color) {
	e.target.style.backgroundColor = color;
}

function manageEventListeners(gridCells) {
	gridContainer.addEventListener("mousedown", (e) => {
		setColor(e, "black");
		console.log("alabala");
		gridCells.forEach((cell) => {
			cell.addEventListener("mouseover", (e) => setColor(e, "black"));
			console.log("balaala");
		});
	});
}

manageEventListeners(gridCells);
