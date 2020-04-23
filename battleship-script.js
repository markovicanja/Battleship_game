
/* Welcome page */
function startGame() {
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;

    var regex = /^\w{3,15}$/;
    if (!player1.match(regex) || !player2.match(regex)) {
        alert("Username not valid!");
        return;
    }

    window.open("battleship-setup.html", "_self");
}


/* Setup page */
var startingCell;
var ship1_length1, ship1_length2, ship1_length3, ship1_length4;
var ship2_length1, ship2_length2, ship2_length3, ship2_length4;
var currentPlayer;


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

            if (!hasShipLength(length)) {
                alert("No ships of length " + length + " left!");
                return;
            }
            if (overlaps()) {
                alert("Overlap!");
                return;
            }

            for (i = start; i != end+di; i += di) {
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

            if (!hasShipLength(length)) {
                alert("No ships of length " + length + " left!");
                return;
            }

            if (overlaps()) {
                alert("Overlap!");
                return;
            }

            for (i = start; i != end+di; i += di) {
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

function init() {
    ship1_length1 = 4, ship1_length2 = 3, ship1_length3 = 2, ship1_length4 = 1;
    ship2_length1 = 4, ship2_length2 = 3, ship2_length3 = 2, ship2_length4 = 1;
    currentPlayer = 1;
    coverSecondTable();
}

function coverFirstTable() {
    $("#cover1").addClass("cover");
}

function coverSecondTable() {
    $("#cover2").addClass("cover");
}

function uncoverFirstTable() {
    $("#cover1").removeClass("cover");
}

function uncoverSecondTable() {
    $("#cover2").removeClass("cover");
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

function overlaps() {

}

function checkIfLastPlaced() {
    if (currentPlayer == 1) {
        if (ship1_length1 ==0 && ship1_length2 ==0 && ship1_length3 ==0 && ship1_length4 ==0) {
            currentPlayer = 2;
            uncoverSecondTable();
            coverFirstTable();
        }
    }
    else if (currentPlayer == 2) {
        if (ship2_length1 ==0 && ship2_length2 ==0 && ship2_length3 ==0 && ship2_length4 ==0) {
            window.open("battleship-game.html", "_self");
        }
    }
}