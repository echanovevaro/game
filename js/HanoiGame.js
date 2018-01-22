function HanoiGame(){
    this.minPieces = 3;
    this.minWidth = 50;
    this.widthGap = 20;
    this.red = 224;
    this.green = 102;
    this.blue = 102;
    this.maxAlpha = 1;
    this.alphaGap = 0.2;
    this.level = 1;
    this.maxLevel = 3;
    this.createLevel();
}

HanoiGame.prototype.createLevel = function() {
    this.movements = 0;
    this.torre1 = new StackDataStructure(this.createPieces(), this.getNumPieces());
    this.torre2 = new StackDataStructure([], this.getNumPieces());
    this.torre3 = new StackDataStructure([], this.getNumPieces());
}

HanoiGame.prototype.createPieces = function(){
    var pieces = [];
    for (index = 0; index < this.getNumPieces(); index++) {
        var width = this.minWidth + this.widthGap*index;
        var alpha = this.maxAlpha - this.alphaGap*(this.getNumPieces() - 1 - index);
        var name = index + 1;
        var piece = $("<div name=" + name + " class='list-group-item'></div>");
        $(piece).css({"width" : width + "px", "background-color" : "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")"});
        pieces.push(piece);
    }
    return pieces.reverse();
}

HanoiGame.prototype.upLevel = function(){
    if(this.isLevelFinished() && !this.isGameFinished()){
        this.level++;
        this.createLevel();
    } else { 
        throw new CustomError("Unable to up level");
    }
}

HanoiGame.prototype.isLevelFinished = function(){
    return !this.torre3Data.canPush();
}

HanoiGame.prototype.isGameFinished = function(){
    return this.level == this.maxLevel && this.isLevelFinished();
}

HanoiGame.prototype.getNumPieces = function(){
    return this.minPieces + this.level - 1;
}

HanoiGame.prototype.getMaxMovements = function(){
    return Math.pow(2, this.getNumPieces()) - 1;
}