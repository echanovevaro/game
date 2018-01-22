$(document).ready(function() {
    var game = new HanoiGame();

    drawLevel(game);
    
    $('.list-group-item').draggable({
        cancel: ".list-group-item:not(:first-child)",
        revert: function(target){
            if(!target){
                return true;
            }
        }
    });

    $(".torre").droppable({
        accept: function(dragElement){
            return $(dragElement).parent() !== $(this) && ($(this).children().length === 0 || $(dragElement).attr("name") < $(this).children(":first-child").attr("name"));
        },
        drop: function( event, ui ) {
            game[$(ui.draggable).parent().attr("id")].pop();
            game[$(this).attr("id")].push(ui.draggable);

            $(this).prepend(ui.draggable);
            $(ui.draggable).css({"top": "0", "left": "0"});
        }
    });

    $(".info a").on("click", function(e){
        window.location.reload(true);
    });   
});

function drawLevel(game){
    insertPieces(game.torre1.stackControl);
    $("div.info h4 span").text(game.getMaxMovements());
    $("div.congratulations").hide();
}

function insertPieces(pieces){
    for (index = 0; index < pieces.length; index++) {
        $("#torre1").prepend(pieces[index]);
    }
}