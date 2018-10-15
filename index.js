/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = "X";
let count = 1;
var number = 0;

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    console.log(grid);
}

function getRowBoxes(colIdx) {
    let rowDivs = "";

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = "darkBackground";
        let content = "";
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = "lightBackground";
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        } else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs =
            rowDivs +
            '<div colIdx="' +
            colIdx +
            '" rowIdx="' +
            rowIdx +
            '" class="box ' +
            additionalClass +
            '">' +
            content +
            "</div>";
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = "";
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + "</div>";
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    var newValue;
    if (count % 2 === 0) {
        newValue = 2;
    } else {
        newValue = 1;
    }

    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    count++;
    let result = decideWinner();
    if (result === 1) {
        alert("X Won");
    } else if (result === 2) {
        alert("O won");
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener("click", onBoxClick, false);
    }
}

/* Check for Winner*/

function decideWinner() {
    for (var i = 0, len = grid.length; i < len; i++) {
        for (var j = 0, _len = grid[i].length; j < _len; j++) {
            const a = 0,
                b = 1,
                c = 2;
            let combination1 =
                grid[i][a] == grid[i][b] &&
                grid[i][a] == grid[i][c] &&
                grid[i][a] !== 0;
            let combination2 =
                grid[a][i] == grid[b][i] &&
                grid[a][i] == grid[c][i] &&
                grid[a][i] !== 0;
            let combination3 =
                grid[a][a] == grid[b][b] &&
                grid[a][a] == grid[c][c] &&
                grid[a][a] !== 0;
            let combination4 =
                grid[a][c] == grid[b][b] &&
                grid[a][c] == grid[c][a] &&
                grid[a][c] !== 0;
            let x = combination1 || combination2 || combination3 || combination4;

            if (x) {
                if (combination1) {
                    number = grid[i][a];
                } else if (combination2) {
                    number = grid[a][i];
                } else if (combination3) {
                    number = grid[a][a];
                } else {
                    number = grid[a][c];
                }
            }
        }
    }
    return number;
}

function reSet() {
    grid = [];
    count = 1;
    number = 0;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}
initializeGrid();
renderMainGrid();
addClickHandlers();