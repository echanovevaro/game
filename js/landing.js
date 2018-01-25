$(document).ready(function () {
	var gameJson = localStorage["game"];
	$("#fwidgets h2").empty();
    if(gameJson){
        var game =JSON.parse(gameJson);
		drawGameOver(game);
		$("#fwidgets h2").text("Juego terminado");
        $("#game-over").show();
        $("#start").hide();
	} else {
		$("#fwidgets h2").text("Empezar");
        $("#start").show();
        $("#game-over").hide();
    }

    $("#game-over button").on("click", function (e) {
        $("#game-over").hide();
        $("#start").show();
        localStorage.removeItem("game");
		window.location.reload();
    });
    
    $(window).unload(function(){
        localStorage.removeItem("game");
    });
});

function drawGameOver(game) {
	$("#game-over .player-list").empty();
	if (game.players.length > 1 ){
		let shortedPlayers = game.players.sort(function (a, b) {
			return b.game.score - a.game.score;
		});
		shortedPlayers.forEach(function (player, i) {
			$("#game-over .player-list").append("<h3>" + parseInt(i + 1) + ".  " + player.name + " con " + player.game.score + " puntos</h3>");
		});
		if (shortedPlayers[0].game.score === shortedPlayers[1].game.score) {
			$("#game-over h1").text("Ha habido un empate ");
		} else {
			$("#game-over h1").text("El ganador es " + shortedPlayers[0].name);
		}
	} else {
		$("#game-over h1").text("Has ganado!");
		$("#game-over .player-list").append("<h3>Puntos acumulados " + game.actualPlayer.game.score + "</h3>");
	}
}