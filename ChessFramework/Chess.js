
var killList = [];
let board = {
    variables: {

        initBoard: [[12,9,7,8,11,7,9,12], 
                    [10,10,10,10,10,10,10,10],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [4,4,4,4,4,4,4,4],
                    [6,3,1,2,5,1,3,6]],
        move: 0
        
    },
    methods: {
        intializeBoard: function(){
            for(var i = 0;i<board.variables.initBoard.length;i++){
                for(var j = 0;j<board.variables.initBoard[i].length;j++){
                    if(board.variables.initBoard[i][j] != 0){
                        $('#'+(i+1)+'_'+(j+1)).html("<img onmousedown='return false' src='sprites/"+board.variables.initBoard[i][j]+".png'></img>");
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
        checkForCheck: function(){
            
            var allPos = [];
            //check for check and mate
            if(board.variables.move % 2 == 0){
                var kingpos;
                for(var i =0;i<8;i++){
                    for(var j=0;j<8;j++){
                        var temp = board.variables.initBoard[i][j];
                        if(temp == 8){
                            kingpos = [i,j];
                        }
                        if(temp != 0 && temp < 7){
                            allPos = allPos.concat(board.methods.getValidPositions(temp,i,j));
                        }
                    }
                }
                for(var g=0;g<allPos.length;g++){
                    //check for check
                    if(allPos[g][0] == kingpos[0] && allPos[g][1] == kingpos[1]){
                        if(board.methods.getValidPositions(8,kingpos[0],kingpos[1]).length == 0){
                            return 2;
                        }
                        return 1;
                    }
                }

            }else{

                var kingpos;
                for(var i =0;i<8;i++){
                    for(var j=0;j<8;j++){
                        var temp = board.variables.initBoard[i][j];
                        if(temp == 2){
                            kingpos = [i,j];
                        }
                        if(temp != 0 && temp > 6){
                            allPos = allPos.concat(board.methods.getValidPositions(temp,i,j));
                        }
                    }
                }
                for(var g=0;g<allPos.length;g++){
                    //check for check
                    if(allPos[g][0] == kingpos[0] && allPos[g][1] == kingpos[1]){
                        if(board.methods.getValidPositions(2,kingpos[0],kingpos[1]).length == 0){
                            return 2;
                        }
                        return 1;
                    }
                }

            }
            return 0;
        },
        //all piece logic for positions
        getValidPositions: function(piece,posX,posY){

            var returnValues = [];
            switch(piece){
                case 1:
                    var i =posX+1,j=posY+1;
                    while(i<8 && j<8){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(board.variables.initBoard[i][j] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
                                returnValues.push([i,j]);
                            }
                            break;
                        }
                        i--;
                        j++;
                    }
                    return returnValues;
                    break;
                case 2:
                   //get possible movement positions 
                    if(posY+1 < 8){
                        if(board.variables.initBoard[posX][posY+1] > 6 || board.variables.initBoard[posX][posY+1] == 0){
                            returnValues.push([posX,posY+1]);
                        }
                        if(posX+1<8 && (board.variables.initBoard[posX+1][posY+1] > 6 || board.variables.initBoard[posX+1][posY+1] == 0)){
                            returnValues.push([posX+1,posY+1]);
                        }
                        if(posX-1>=0 && (board.variables.initBoard[posX-1][posY+1] > 6 || board.variables.initBoard[posX-1][posY+1] == 0)){
                            returnValues.push([posX-1,posY+1]);
                        }
                    }
                    if(posY-1 >= 0){
                        if(board.variables.initBoard[posX][posY-1] > 6 || board.variables.initBoard[posX][posY-1] == 0){
                            returnValues.push([posX,posY-1]);
                        }
                        if(posX+1<8 && (board.variables.initBoard[posX+1][posY-1] > 6 || board.variables.initBoard[posX+1][posY-1] == 0)){
                            returnValues.push([posX+1,posY-1]);
                        }
                        if(posX-1>=0 && (board.variables.initBoard[posX-1][posY-1] > 6 || board.variables.initBoard[posX-1][posY-1] == 0)){
                            returnValues.push([posX-1,posY-1]);
                        }
                    }
                    if(posX-1 >=0 && (board.variables.initBoard[posX-1][posY] > 6 || board.variables.initBoard[posX-1][posY] == 0)){
                        returnValues.push([posX-1,posY]);
                    }
                    if(posX+1 < 8 && (board.variables.initBoard[posX+1][posY] > 6 || board.variables.initBoard[posX+1][posY] == 0)){
                        returnValues.push([posX+1,posY]);
                    }

                   //find movements into check so many for loops yikes
                    for(var f =0;f<8;f++){
                        for(var t=0;t<8;t++){
                            var temp = board.variables.initBoard[f][t];
                            if(temp > 6){
                                var tempPositions = [];
                                
                                //king preventing inf loop king attack area
                                if(temp !=8){
                                    tempPositions = board.methods.getValidPositions(temp,f,t);
                                }else{
                                    tempPositions = [[f+1,t],[f+1,t+1],[f,t+1],[f-1,t],[f-1,t+1],[f-1,t-1],[f,t-1],[f+1,t-1]];
                                }
                                //pawns special movement attack area
                                if(temp == 10){
                                    tempPositions = [];
                                    tempPositions.push([f+1,t+1]);
                                    tempPositions.push([f+1,t-1]);
                                }
                                for(var e=0;e<tempPositions.length;e++){
                                    for(var q=0;q<returnValues.length;q++){
                                        if(tempPositions[e][0] == returnValues[q][0] && tempPositions[e][1] == returnValues[q][1]){
                                            returnValues.splice(q,1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return returnValues;
                    break;
                case 3:
                    //horse movement is a thing of beauty
                    var m=2;
                    var n=1;
                    for(var k=0;k<8;k++){
                        if(k != 4){
                            if(k%2==0){
                                m *= -1;
                            }else{
                                n *= -1;
                            }
                        }else{
                            n=2;
                            m=1;
                        }
                        if(posX+m < 8 && posX+m >= 0 && posY+n<8 && posY+n >= 0){
                            if(board.variables.initBoard[posX+m][posY+n] == 0 || board.variables.initBoard[posX+m][posY+n] > 6){
                                returnValues.push([posX+m,posY+n]);
                            }
                        }
                    }
                    return returnValues;
                    break;
                case 4:
                    if(board.variables.initBoard[posX-1][posY] == 0){
                        returnValues.push([posX-1,posY]);
                    }
                    if(board.variables.initBoard[posX-1][posY+1] > 6){
                        returnValues.push([posX-1,posY+1]);
                    }
                    if(board.variables.initBoard[posX-1][posY-1] > 6){
                        returnValues.push([posX-1,posY-1]);
                    }
                    if(posX == 6 && (board.variables.initBoard[posX-2][posY] == 0) && (board.variables.initBoard[posX-1][posY] == 0)){
                        returnValues.push([posX-2,posY]);
                    }
                    return returnValues;
                    break;
                case 5:
                    //also add functionality for taking
                    for(var i=posY+1;i<8;i++){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(board.variables.initBoard[posX][i] > 6){
                                returnValues.push([posX,i]);
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(board.variables.initBoard[posX][i] > 6){
                                returnValues.push([posX,i]);
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(board.variables.initBoard[i][posY] < 7){
                                returnValues.push([i,posY]);
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(board.variables.initBoard[i][posY] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
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
                            if(board.variables.initBoard[i][j] > 6){
                                returnValues.push([i,j]);
                            }
                            break;
                        }
                        i--;
                        j++;
                    }
                    return returnValues;
                break;
                case 6:
                    //also add functionality for taking
                    for(var i=posY+1;i<8;i++){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(board.variables.initBoard[posX][i] > 6){
                                returnValues.push([posX,i]);
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(board.variables.initBoard[posX][i] > 6){
                                returnValues.push([posX,i]);
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(board.variables.initBoard[i][posY] < 7){
                                returnValues.push([i,posY]);
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(board.variables.initBoard[i][posY] > 6){
                                returnValues.push([i,posY]);
                            }
                            break;
                        }
                    }
                    return returnValues;
                    break;
                case 7:
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
                case 8:
                    //get possible movement positions 
                    if(posY+1 < 8){
                        if(board.variables.initBoard[posX][posY+1] < 7){
                            returnValues.push([posX,posY+1]);
                        }
                        if(posX+1<8){
                            if(board.variables.initBoard[posX+1][posY+1] < 7){
                                returnValues.push([posX+1,posY+1]);
                            }
                        }
                        if(posX-1>=0){
                            if(board.variables.initBoard[posX-1][posY+1] < 7){
                                returnValues.push([posX-1,posY+1]);
                            }
                        }
                    }
                    if(posY-1 >= 0){
                        if(board.variables.initBoard[posX][posY-1] < 7){
                            returnValues.push([posX,posY-1]);
                        }
                        if(posX+1<8){
                            if(board.variables.initBoard[posX+1][posY-1] < 7){
                                returnValues.push([posX+1,posY-1]);
                            }
                        }
                        if(posX-1>=0){
                            if(board.variables.initBoard[posX-1][posY-1] < 7){
                                returnValues.push([posX-1,posY-1]);
                            }
                        }
                    }
                    if(posX-1 >=0){
                        if(board.variables.initBoard[posX-1][posY] < 7){
                            returnValues.push([posX-1,posY]);
                        }
                    }
                    if(posX+1 < 8){
                        if(board.variables.initBoard[posX+1][posY] < 7){
                            returnValues.push([posX+1,posY]);
                        }
                    }

                    //find movements into check so many for loops yikes
                    for(var f =0;f<8;f++){
                        for(var t=0;t<8;t++){
                            var temp = board.variables.initBoard[f][t];
                            if(temp < 7 && temp > 0){
                                var tempPositions = [];

                                //king attack area preventing inf loop
                                if(temp !=2){
                                    tempPositions = board.methods.getValidPositions(temp,f,t);
                                }else{
                                    tempPositions = [[f+1,t],[f+1,t+1],[f,t+1],[f-1,t],[f-1,t+1],[f-1,t-1],[f,t-1],[f+1,t-1]];
                                }

                                //pawns special movement attack area
                                if(temp == 4){
                                    tempPositions = [];
                                    tempPositions.push([f-1,t+1]);
                                    tempPositions.push([f-1,t-1]);
                                }

                                for(var e=0;e<tempPositions.length;e++){
                                    for(var q=0;q<returnValues.length;q++){
                                        if(tempPositions[e][0] == returnValues[q][0] && tempPositions[e][1] == returnValues[q][1]){
                                            returnValues.splice(q,1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return returnValues;
                    break;
                case 9:
                        //horse movement is a thing of beauty
                        var m=2;
                        var n=1;
                        for(var k=0;k<8;k++){
                            if(k != 4){
                                if(k%2==0){
                                    m *= -1;
                                }else{
                                    n *= -1;
                                }
                            }else{
                                n=2;
                                m=1;
                            }
                            if(posX+m < 8 && posX+m >= 0 && posY+n<8 && posY+n >= 0){
                                if(board.variables.initBoard[posX+m][posY+n] == 0 || board.variables.initBoard[posX+m][posY+n] < 7){
                                    returnValues.push([posX+m,posY+n]);
                                }
                            }
                        }
                        return returnValues;
                        break;
                case 10:
                        if(board.variables.initBoard[posX+1][posY] == 0){
                            returnValues.push([posX+1,posY]);
                        }
                        if(board.variables.initBoard[posX+1][posY+1] <7 && board.variables.initBoard[posX+1][posY+1] != 0){
                            returnValues.push([posX+1,posY+1]);
                        }
                        if(board.variables.initBoard[posX+1][posY-1] <7 && board.variables.initBoard[posX+1][posY-1] != 0){
                            returnValues.push([posX+1,posY-1]);
                        }
                        if(posX == 1 && board.variables.initBoard[posX+2][posY] == 0 &&  (board.variables.initBoard[posX+1][posY] == 0)){
                            returnValues.push([posX+2,posY]);
                        }
                        return returnValues;
                        break;
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
                            if(board.variables.initBoard[i][posY] < 7){
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
                case 12:
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
                            if(board.variables.initBoard[i][posY] < 7){
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


    var gameCell = $(mouseToCoordinates(event.pageX,event.pageY))[0];
    if(mouseToCoordinates(event.pageX,event.pageY) == -1){
        return;
    }

    coX = board.methods.getX(currentMousePos.x);
    coY = board.methods.getY(currentMousePos.y);

    //checking before allowing move
    //check white or black to move
    if(board.variables.move % 2 == 0 && board.variables.initBoard[coY][coX] < 7 && board.variables.initBoard[coY][coX] !=0 ){
        return;
    }else if(board.variables.move % 2 == 1 && board.variables.initBoard[coY][coX] > 6){
        return;
    }

    if(board.methods.checkForCheck() > 0 && (board.variables.initBoard[coX][coY] != 8 || board.variables.initBoard[coX][coY] != 2 )){
        console.log("in check");
        if(board.methods.checkForCheck()==2){
            console.log("in checkmate");
        }
        return;
    }

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
    $('#'+(coY+1)+'_'+(coX+1)).addClass("highlight");

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

        board.variables.move++;
        $(mouseToCoordinates(currEvent.pageX,currEvent.pageY)).html(savSelected);

        //automatic promotion to queen
        var prom = false;
        if((relY == 7 && board.variables.initBoard[relY][relX] == 10)){
            prom =true;
            board.variables.initBoard[relY][relX] = 11;
        }
        if((relY == 0 && board.variables.initBoard[relY][relX] == 4)){
            prom = true;
            board.variables.initBoard[relY][relX] = 5;
        }
        if(prom){
            board.methods.intializeBoard();
        }

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
    $('#'+(coY+1)+'_'+(coX+1)).removeClass("highlight");
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