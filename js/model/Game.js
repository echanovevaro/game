function Game(players) {
	this.players = [];
	for ( i = 0; i < players; i++) {
		var player = {
			name: "Jugador " + parseInt(i + 1),
			game: new HanoiGame()
		};
		this.players.push(player);
	}
	this.indexPlayer = 0;
	this.actualPlayer = this.players[this.indexPlayer];
	this.round = 1;
	this.maxRound = this.actualPlayer.game.maxLevel;
}

Game.prototype.getNextPlayer = function () {
	if (!this.roundFinished()) {
		this.indexPlayer++;
		this.actualPlayer = this.players[this.indexPlayer];
		return this.actualPlayer;
	} else {
		throw new CustomError("Round finished");
	}
}

Game.prototype.roundFinished = function () {
	var self = this;
	return this.players.every(function (player) {
		return player.game.level == self.round && player.game.isLevelFinished();
	});
}

Game.prototype.gameFinished = function () {
	return this.roundFinished() && this.round == this.maxRound;
}

Game.prototype.upRound = function () {
	if (this.roundFinished() && !this.gameFinished()) {
		this.players.forEach(function(player) {
			player.game.upLevel();
		});
		this.indexPlayer = 0;
		this.actualPlayer = this.players[this.indexPlayer];
		this.round++;
	} else {
		throw new CustomError("Unable to up round");
	}
}


