
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

function startCounting(cell) {
    startingCell = cell;
}

function stopCounting(cell) {
    // var length;

    if (startingCell.charAt(0) == cell.charAt(0)) {
        if (startingCell.charAt(1) == cell.charAt(1)) { // same column
            // length = Math.abs(parseInt(startingCell.charAt(2)) - parseInt(cell.charAt(2))) + 1;

            var di = parseInt(startingCell.charAt(2)) <= parseInt(cell.charAt(2)) ? 1 : -1;
            var start = parseInt(startingCell.charAt(2));
            var end = parseInt(cell.charAt(2));
            var cellStr = startingCell.substr(0,2);

            for (i = start; i != end+di; i += di) {
                document.getElementById(cellStr+i).style="background-image: url(./battleship-assets/images/metal.jpg);";
            }
        }
        else if (startingCell.charAt(2) == cell.charAt(2)) { // same row
            // length = Math.abs(startingCell.charCodeAt(1) - cell.charCodeAt(1)) + 1;
            
            var di = startingCell.charCodeAt(1) <= cell.charCodeAt(1) ? 1 : -1;
            var start = startingCell.charCodeAt(1);
            var end = cell.charCodeAt(1);
            var tableNum = startingCell.substr(0,1);
            var rowNum = startingCell.substr(2,1);

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
}

function coverFirstTable() {
    $("#cover1").addClass("cover");
}

function coverSecondTable() {
    $("#cover2").addClass("cover");
}