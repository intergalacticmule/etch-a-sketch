const gridContainer = document.querySelector("#grid-container");
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
	e.target.style.backgroundColor = color;
	e.target.classList.add("border-none");
}

function mouseoverEventListener(e) {
	setColors(e, "black");
}

function manageEventListeners(gridCells) {
	gridContainer.addEventListener("mousedown", (e) => {
		setColors(e, "black");
		console.log("alabala");
		gridCells.forEach((cell) => {
			cell.addEventListener("mouseover", mouseoverEventListener);
			console.log("balaala");
		});
	});

	gridContainer.addEventListener("mouseup", () => {
		gridCells.forEach((cell) => {
			cell.removeEventListener("mouseover", mouseoverEventListener);
		});
	});
}

manageEventListeners(gridCells);
