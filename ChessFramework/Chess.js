var move = 0;
var killList = [];
let board = {
    variables: {
        initBoard: [[0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,11,0,0,0],
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
                            case 11:
                                $('#'+(i+1)+'_'+(j+1)).html("<img onmousedown='return false' src='sprites/11.png'></img>");
                                break;
                        }
                    }
                }
            }
        },
        getX: function(mouseX){
            if((mouseX-(mouseX%48))/48 < 8){
                return ((mouseX-(mouseX%48))/48);
            }else{
                return -1;
            }
        },
        getY: function(mouseY){
            if((mouseY-(mouseY%48))/48 < 8){
                return 7-((mouseY-(mouseY%48))/48);
            }else{
                return -1;
            }
        },
        getValidPositions: function(piece,posX,posY){
            var returnValues = [];
            switch(piece){
                case 11:
                    //also add functionality for taking
                    for(var i=posY+1;i<8;i++){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(board.variables.initBoard[posX][i] < 7){
                                returnValues.push([posX,i]);
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(board.variables.initBoard[posX][i] < 7){
                                returnValues.push([posX,i]);
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(initBoard[i][posY] < 7){
                                returnValues.push([i,posY]);
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(board.variables.initBoard[i][posY] < 7){
                                returnValues.push([i,posY]);
                            }
                            break;
                        }
                    }
                    var i =posX+1,j=posY+1;
                    while(i<8 && j<8){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(board.variables.initBoard[i][j] < 7){
                                returnValues.push([i,j]);
                            }
                            break;
                        }
                        i++;
                        j++;
                    }
                    var i =posX+1,j=posY-1;
                    while(i<8 && j>=0){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(board.variables.initBoard[i][j] < 7){
                                returnValues.push([i,j]);
                            }
                            break;
                        }
                        i++;
                        j--;
                    }
                    var i =posX-1,j=posY-1;
                    while(i>=0 && j>=0){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(board.variables.initBoard[i][j] < 7){
                                returnValues.push([i,j]);
                            }
                            break;
                        }
                        i--;
                        j--;
                    }
                    var i =posX-1,j=posY+1;
                    while(i>=0 && j<8){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(board.variables.initBoard[i][j] < 7){
                                returnValues.push([i,j]);
                            }
                            break;
                        }
                        i--;
                        j++;
                    }
                    return returnValues;
                    break;

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
var allPositions;
var coX;
var coY;
var savSelected;
var mdown = false;
$(document).mousedown(function(event){
     //get mouse position
    var currentMousePos = { x: -1, y: -1 };
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;

    var offsetX=0, offsetY=0;

    var gameCell = $(mouseToCoordinates(event.pageX,event.pageY))[0];
    if(mouseToCoordinates(event.pageX,event.pageY) == -1){
        return;
    }

    coX = board.methods.getX(currentMousePos.x);
    coY = board.methods.getY(currentMousePos.y);

    if(coX != -1 && coY != -1){
        if(board.variables.initBoard[coY][coX] == 0){
            return;
        }else{
            allPositions = board.methods.getValidPositions(board.variables.initBoard[coY][coX],coY,coX);
        }
    }else{
        return;
    }
    mdown = true;
    //highlight positions
    for(var i=0;i<allPositions.length;i++){
        $('#'+(allPositions[i][0]+1)+'_'+(allPositions[i][1]+1)).addClass("highlight");
    }

    //saving insides of the div
    $('#selector').css("display","block");
    var rect = gameCell.getBoundingClientRect();
    $('#selector').html(gameCell.innerHTML);
    savSelected = $(mouseToCoordinates(event.pageX,event.pageY)).html();
    $(mouseToCoordinates(event.pageX,event.pageY)).html("");

    $('#selector').css("top",(rect.top-8)+"px");
    $('#selector').css("left",(rect.left-8)+"px");


}).mousemove(function(currEvent){
    if(!mdown){
        return;
    }
    $('#selector').css("top",(currEvent.pageY - 32)+"px");
    $('#selector').css("left",(currEvent.pageX - 32)+"px");


}).mouseup(function(currEvent){
    if(!mdown){
        return;
    }
    $('#selector').off("mousemove");

    //check if valid
    var relX = board.methods.getX(currEvent.pageX);
    var relY = board.methods.getY(currEvent.pageY);

    var found = false;
    for(var a = 0;a<allPositions.length;a++){
        if(allPositions[a][0]==relY && allPositions[a][1] == relX){
            found = true;
            break;
        }
    }
    
    //first check if inside box
    if((((currEvent.pageY-(currEvent.pageY%48))/48 < 8 && (currEvent.pageX-(currEvent.pageX%48))/48 < 8))&&found){
        //check for capture
        if(board.variables.initBoard[relY][relX]  != 0){
            killList.push(board.variables.initBoard[relY][relX]);
        }

        //change board values
        board.variables.initBoard[relY][relX] = board.variables.initBoard[coY][coX];
        board.variables.initBoard[coY][coX] = 0;

        move++;
        $(mouseToCoordinates(currEvent.pageX,currEvent.pageY)).html(savSelected);
    }else{
        board.methods.intializeBoard();
    }

    //snap to box
    $('#selector').html("");
    $('#selector').css("top","-48px");
    $('#selector').css("left","-48px");

    $('#selector').css("display","none");

    //removehighlight
    //highlight positions
    for(var i=0;i<allPositions.length;i++){
        $('#'+(allPositions[i][0]+1)+'_'+(allPositions[i][1]+1)).removeClass("highlight");
    }
    allPositions = [];
    coX = -1;
    coY = -1;
    savSelected = "";
});



$(document).ready(function() {
    board.methods.intializeBoard();
    //var arr = board.methods.getValidPositions(11,7,0);
    //for(var i=0;i<arr.length;i++){
        //$('#'+(arr[i][0]+1)+'_'+(arr[i][1]+1)).addClass("highlight");
    //}
});