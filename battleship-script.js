
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

