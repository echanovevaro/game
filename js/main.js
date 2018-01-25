$(document).ready(function () {
	var game;
	$(".congratulations").hide();
	var jugadores = window.location.search.substr(1).split("jugadores=")[1];

	if(!jugadores){
		window.location.replace("index.html");
	} else {
		game = new Game(jugadores);
		showRound(game);
	}    
});

function drawLevel(game) {
	$(".info span").text(0);
	$(".info span").css("color", "rgb(51, 51, 51)");
	$("#torre1").empty();
	$("#torre2").empty();
	$("#torre3").empty();
	insertPieces(game.actualPlayer.game.torre1.stackControl);
	$(".row:first-child h3 span.level").empty();
	$(".row:first-child h3 span.level").text(game.actualPlayer.game.level);
	if (game.players.length > 1) {
		$(".row:first-child h3 span.player").empty();
		$(".row:first-child h3 span.player").text(" - " + game.actualPlayer.name);
	}
	$(".info h4 span").text(game.actualPlayer.game.getMaxMovements());
	$(".congratulations").hide();

	$('.row .list-group-item').draggable({
		cursor: 'move',
		cancel: '.row .list-group-item:not(:first-child)',
		revert: function (target) {
			if (!target) {
				return true;
			} else {
				if ($(target).has($(this)).length) {
					return false;
				} else {
					return true;
				}
			}
		}
	});

	$(".torre").droppable({
		classes: {
			"ui-droppable-active": "ui-state-default"
		},
		accept: function (dropElem) {
			return $(dropElem).parent() != $(this) && ($(this).children().length === 0 || $(dropElem).attr("name") < $(this).children(':first-child').attr("name"));
		},
		drop: function (event, ui) {
			game.actualPlayer.game[$(ui.draggable).parent().attr('id')].pop();
			game.actualPlayer.game[$(this).attr('id')].push($(ui.draggable));
			
			$(ui.draggable).css({ "left": "0", "top": "0", "right": "0", "bottom": "0" });
			$(this).prepend(ui.draggable);

			upMovements(game.actualPlayer.game);
			checkGameState(game);
		}
	});
}

function insertPieces(pieces){
    for (index = 0; index < pieces.length; index++) {
        $("#torre1").prepend(pieces[index]);
    }
}

function upMovements(game) {
	game.movements++;
	$(".info h2 span").text(game.movements);
	if (game.movements > game.getMaxMovements()) {
		$(".info h2 span").css("color", "red");
	}
}

function checkGameState(game) {
	if (game.actualPlayer.game.isLevelFinished()) {
		$(".congratulations").fadeIn();
		game.actualPlayer.game.actualizeScore();
		$(".congratulations h4").empty();
		$(".congratulations h4").text("Puntos acumulados  " + game.actualPlayer.game.score);
		$('.ui-draggable').draggable("disable");
		if (game.gameFinished()) {
			setTimeout(function () {
				localStorage["game"] = JSON.stringify(game);
				window.location.replace("index.html");
			}, 3000);
		} else {
			if (game.roundFinished()) {
				game.upRound();
			} else {
				game.getNextPlayer();
			}
			setTimeout(function () {
				showRound(game);
			}, 3000);
		}
	}
}

function showRound(game) {
	$('#round').modal();
	$("#round h2").empty();
	if (game.players.length > 1) {
		$("#round h2").text("Ronda " + game.round + "  ( " + game.actualPlayer.name + " )");
	} else {
		$("#round h2").text("Nivel " + game.round);
	}
	drawLevel(game);
	setTimeout(function () {
		$('#round').modal('hide');
	}, 3000);
}