
/* Welcome page */
function startGame() {
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;

    var regex = /^\w{3,15}$/;
    if (!player1.match(regex) || !player2.match(regex)) {
        alert("Username not valid!");
        return;
    }

    localStorage.clear();
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    window.open("battleship-setup.html", "_self");
}


/* Setup page */
var startingCell;
var ship1_length1, ship1_length2, ship1_length3, ship1_length4;
var ship2_length1, ship2_length2, ship2_length3, ship2_length4;
var currentPlayer;
var table1Matrix = [], table2Matrix = [];


function startCounting(cell) {
    startingCell = cell;
}

function stopCounting(cell) {
    var length;

    if (startingCell.charAt(0) == cell.charAt(0)) {
        if (startingCell.charAt(1) == cell.charAt(1)) { // same column
            length = Math.abs(parseInt(startingCell.charAt(2)) - parseInt(cell.charAt(2))) + 1;

            var di = parseInt(startingCell.charAt(2)) <= parseInt(cell.charAt(2)) ? 1 : -1;
            var start = parseInt(startingCell.charAt(2));
            var end = parseInt(cell.charAt(2));
            var cellStr = startingCell.substr(0,2);

            if (overlaps(startingCell, cell, currentPlayer==1? table1Matrix: table2Matrix)) {
                alert("Overlap!");
                return;
            }
            if (!hasShipLength(length)) {
                alert("No ships of length " + length + " left!");
                return;
            }

            for (i = start; i != end+di; i += di) {
                setMatrix(currentPlayer==1? table1Matrix: table2Matrix, cellStr+i);
                document.getElementById(cellStr+i).style="background-image: url(./battleship-assets/images/metal.jpg);";
            }
        }
        else if (startingCell.charAt(2) == cell.charAt(2)) { // same row
            length = Math.abs(startingCell.charCodeAt(1) - cell.charCodeAt(1)) + 1;
            
            var di = startingCell.charCodeAt(1) <= cell.charCodeAt(1) ? 1 : -1;
            var start = startingCell.charCodeAt(1);
            var end = cell.charCodeAt(1);
            var tableNum = startingCell.substr(0,1);
            var rowNum = startingCell.substr(2,1);

            if (overlaps(startingCell, cell, currentPlayer==1? table1Matrix: table2Matrix)) {
                alert("Overlap!");
                return;
            }
            if (!hasShipLength(length)) {
                alert("No ships of length " + length + " left!");
                return;
            }

            for (i = start; i != end+di; i += di) {
                setMatrix(currentPlayer==1? table1Matrix: table2Matrix, tableNum + String.fromCharCode(i) + rowNum);
                document.getElementById(tableNum + String.fromCharCode(i) + rowNum).style="background-image: url(./battleship-assets/images/metal.jpg);";
            }            
        }
        else {
            alert("You can only place ship horizontally or vertically");
            return;
        }
    }
    else {
        alert("Please select cell from your table!");
        return;
    }

    checkIfLastPlaced();
}

function initSetup() {
    ship1_length1 = 4, ship1_length2 = 3, ship1_length3 = 2, ship1_length4 = 1;
    ship2_length1 = 4, ship2_length2 = 3, ship2_length3 = 2, ship2_length4 = 1;
    currentPlayer = 1;
    coverTable(2);
    $("#label1").html(localStorage.getItem("player1")+", place your ships!");
    $("#label2").html(localStorage.getItem("player2")+", place your ships!");

    for(var i = 0; i < 10; i++) {
        table1Matrix[i] = [];
        table2Matrix[i] = [];
        for(var j = 0; j < 10; j++) {
            table1Matrix[i][j] = 0;
            table2Matrix[i][j] = 0;
        }
    }
}

function coverTable(num) {
    $("#cover" + num).addClass("cover");
    $("#cover"+ num).removeClass("hidden");
}

function uncoverTable(num) {
    $("#cover"+ num).removeClass("cover");
    $("#cover"+ num).addClass("hidden");
}

function hasShipLength(length) {
    if (currentPlayer == 1) {
        switch(length) {
            case 1: 
            if (ship1_length1 > 0) {
                ship1_length1--;
                $("#shipsLeft11").html(ship1_length1 + " ships left");
                return true;
            }
            return false;
            break;

            case 2: 
            if (ship1_length2 > 0) {
                ship1_length2--;
                $("#shipsLeft12").html(ship1_length2 + " ships left");
                return true;
            }
            return false;
            break;

            case 3: 
            if (ship1_length3 > 0) {
                ship1_length3--;
                $("#shipsLeft13").html(ship1_length3 + " ships left");
                return true;
            }
            return false;
            break;

            case 4: 
            if (ship1_length4 > 0) {
                ship1_length4--;
                $("#shipsLeft14").html(ship1_length4 + " ships left");
                return true;
            }
            return false;
            break;

            default: return false; break;
        }
    }
    else if (currentPlayer == 2) {
        switch(length) {
            case 1: 
            if (ship2_length1 > 0) {
                ship2_length1--;
                $("#shipsLeft21").html(ship2_length1 + " ships left");
                return true;
            }
            return false;
            break;

            case 2: 
            if (ship2_length2 > 0) {
                ship2_length2--;
                $("#shipsLeft22").html(ship2_length2 + " ships left");
                return true;
            }
            return false;
            break;

            case 3: 
            if (ship2_length3 > 0) {
                ship2_length3--;
                $("#shipsLeft23").html(ship2_length3 + " ships left");
                return true;
            }
            return false;
            break;

            case 4: 
            if (ship2_length4 > 0) {
                ship2_length4--;
                $("#shipsLeft24").html(ship2_length4 + " ships left");
                return true;
            }
            return false;
            break;

            default: return false; break;
        }
    }
}

function setMatrix(matrix, cell) {
    var j = cell.charCodeAt(1) - 65;
    var i = parseInt(cell.charAt(2));

    matrix[i][j] = 2;
    if (i-1>=0 && j-1>=0 && matrix[i-1][j-1]!=2) matrix[i-1][j-1] = 1;
    if (i-1>=0 && matrix[i-1][j]!=2) matrix[i-1][j] = 1;
    if (i-1>=0 && j+1<10 && matrix[i-1][j+1]!=2) matrix[i-1][j+1] = 1;
    if (j-1>=0 && matrix[i][j-1]!=2) matrix[i][j-1] = 1;
    if (j+1<10 && matrix[i][j+1]!=2) matrix[i][j+1] = 1;
    if (i+1<10 && j-1>=0 && matrix[i+1][j-1]!=2) matrix[i+1][j-1] = 1;
    if (i+1<10 && matrix[i+1][j]!=2) matrix[i+1][j] = 1;
    if (i+1<10 && j+1<10 && matrix[i+1][j+1]!=2) matrix[i+1][j+1] = 1;      
}

function overlaps(start, end, matrix) {
    var iStart = parseInt(start.charAt(2));
    var jStart = start.charCodeAt(1) - 65;
    var iEnd = parseInt(end.charAt(2));
    var jEnd = end.charCodeAt(1) - 65;

    if (jStart == jEnd) { // vertical
        j = jStart;
        for (i = iStart; i <= iEnd; i++) {
            if (matrix[i][j] > 0) return true;
        }
    }
    if (iStart == iEnd) { // horizontal
        i = iStart;
        for (j = jStart; j <= jEnd; j++) {
            if (matrix[i][j] > 0) return true;
        }
    }
    return false;
}

function checkIfLastPlaced() {
    if (currentPlayer == 1) {
        if (ship1_length1 == 0 && ship1_length2 == 0 && ship1_length3 == 0 && ship1_length4 == 0) {
            currentPlayer = 2;
            uncoverTable(2);
            coverTable(1);
            localStorage.setItem("table1", JSON.stringify(table1Matrix));
        }
    }
    else if (currentPlayer == 2) {
        if (ship2_length1 == 0 && ship2_length2 == 0 && ship2_length3 == 0 && ship2_length4 == 0) {
            localStorage.setItem("table2", JSON.stringify(table2Matrix));
            window.open("battleship-game.html", "_self");
        }
    }
}

/* Battleship Game */

function initGame() {
    $("#label1").html(localStorage.getItem("player1")+"'s board!");
    $("#label2").html(localStorage.getItem("player2")+"'s board!");
    $("#label3").html(localStorage.getItem("player1")+"'s board!");
    $("#label4").html(localStorage.getItem("player2")+"'s board!");
    addShips(1); addShips(2);
    coverTable(2);
}

function addShips(num) {
    var matrix = JSON.parse(localStorage.getItem("table"+num));

    for (i = 0; i < 10; i++) 
        for (j = 0; j < 10; j++)
            if (matrix[i][j] == 2) {
                var cell = "#" + num + String.fromCharCode(j + 65) + i;
                $(cell).addClass("bg-metal");
            } 
}

function shoot(cell) {
    
}