let board = {
    variables: {
        initBoard: [[0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]]
        
    },
    methods: {
        intializeBoard: function(){
            for(var i = 0;i<board.variables.initBoard.length;i++){
                for(var j = 0;j<board.variables.initBoard[i].length;j++){
                    if(board.variables.initBoard[i][j] != 0){
                        switch(board.variables.initBoard[i][j]){
                            case 1:
                                console.log('#'+i+'_'+j);
                                $('#'+(i+1)+'_'+(j+1)).html("<img onmousedown='return false' src='sprites/whiteQueen.png'></img>");
                                break;
                        }
                    }
                }
            }
        }
    }
}

function mouseToCoordinates(mouseX,mouseY){
    if((mouseX-(mouseX%48))/48 < 8 && (mouseY-(mouseY%48))/48 < 8){
        return '#'+(8-((mouseY-(mouseY%48))/48))+'_'+(((mouseX-(mouseX%48))/48)+1);
    }else{
        return -1;
    }
}

$(document).mousedown(function(event){
     //get mouse position
    var currentMousePos = { x: -1, y: -1 };
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;

    var offsetX=0, offsetY=0;

    var gameCell = $(mouseToCoordinates(event.pageX,event.pageY))[0];

    $('#selector').css("display","block");
    var rect = gameCell.getBoundingClientRect();

    $('#selector').html(gameCell.innerHTML);
    var savSelected = gameCell.innerHTML;

    gameCell.innerHTML = "";

    $('#selector').css("top",(rect.top-8)+"px");
    $('#selector').css("left",(rect.left-8)+"px");

    offsetY  = (rect.bottom-rect.top)/2+8;
    offsetX  = (rect.right-rect.left)/2+8;

    //moving the selected div around
    $('#selector').mousemove(function(currEvent){
        $('#selector').css("top",(currEvent.pageY - offsetY)+"px");
        $('#selector').css("left",(currEvent.pageX - offsetX)+"px");
    }).mouseup(function(currEvent){
        $('#selector').off("mousemove");
        $(document).off("mousemove");

        //check if valid
        
        //first check if inside box
        if((currEvent.pageY-(currEvent.pageY%48))/48 < 8 && (currEvent.pageX-(currEvent.pageX%48))/48 < 8){
            $(mouseToCoordinates(currEvent.pageX,currEvent.pageY)).html(savSelected);
        }else{
            gameCell.innerHTML = savSelected;
        }

        //snap to box
        $('#selector').css("top",(currEvent.pageY-(currEvent.pageY%48))+"px");
        $('#selector').css("left",(currEvent.pageX-(currEvent.pageX%48))+"px");

        $('#selector').css("display","none");
        $('#selector').html("");
    });
});



$(document).ready(function() {
    board.methods.intializeBoard();
});