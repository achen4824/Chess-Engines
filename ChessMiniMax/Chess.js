

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
        move: 0,
        killList: []
        
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
            var attackingPieces = [];
            //check for check and mate
            if(board.variables.move % 2 == 0){
                var kingpos;
                for(var w=0;w<8;w++){
                    for(var f=0;f<8;f++){
                        if(board.variables.initBoard[w][f] == 8){
                            kingpos = [w,f];
                        }

                    }
                }

                for(var i =0;i<8;i++){
                    for(var j=0;j<8;j++){
                        var temp = board.variables.initBoard[i][j];
                        if(temp != 0 && temp < 7){
                            var positions = board.methods.getValidPositions(temp,i,j,false);
                            for(var t=0;t<positions.length;t++){
                                if(positions[t][0] == kingpos[0] && positions[t][1] == kingpos[1]){
                                    attackingPieces.push([temp,i,j]);
                                }
                            }
                        }
                    }
                }

            }else{
                var kingpos;
                for(var w=0;w<8;w++){
                    for(var f=0;f<8;f++){
                        if(board.variables.initBoard[w][f] == 2){
                            kingpos = [w,f];
                        }

                    }
                }

                for(var i =0;i<8;i++){
                    for(var j=0;j<8;j++){
                        var temp = board.variables.initBoard[i][j];
                        if(temp != 0 && temp > 6){
                            var positions = board.methods.getValidPositions(temp,i,j,false);
                            for(var t=0;t<positions.length;t++){
                                if(positions[t][0] == kingpos[0] && positions[t][1] == kingpos[1]){
                                    attackingPieces.push([temp,i,j]);
                                }
                            }
                        }
                    }
                }
            }
            return attackingPieces;
        },
        //all piece logic for positions
        getValidPositions: function(piece,posX,posY,attack){

            var returnValues = [];
            switch(piece){
                case 1:
                    var i =posX+1,j=posY+1;
                    while(i<8 && j<8){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                                    tempPositions = board.methods.getValidPositions(temp,f,t,true);
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
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] > 6){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] > 6){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] > 6){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] > 6){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    var i =posX+1,j=posY+1;
                    while(i<8 && j<8){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] > 6){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] > 6){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] > 6){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] > 6){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] > 6){
                                    returnValues.push([i,posY]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                                    tempPositions = board.methods.getValidPositions(temp,f,t,true);
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
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] < 7){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] < 7){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] < 7){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] < 7){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    var i =posX+1,j=posY+1;
                    while(i<8 && j<8){
                        if(board.variables.initBoard[i][j] == 0){
                            returnValues.push([i,j]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([i,j]);
                            }else{
                                if(board.variables.initBoard[i][j] < 7){
                                    returnValues.push([i,j]);
                                }
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
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] < 7){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posY-1;i>=0;i--){
                        if(board.variables.initBoard[posX][i] == 0){
                            returnValues.push([posX,i]);
                        }else{
                            if(attack===true){
                                returnValues.push([posX,i]);
                            }else{
                                if(board.variables.initBoard[posX][i] < 7){
                                    returnValues.push([posX,i]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX+1;i<8;i++){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] < 7){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    for(var i=posX-1;i>=0;i--){
                        if(board.variables.initBoard[i][posY] == 0){
                            returnValues.push([i,posY]);
                        }else{
                            if(attack===true){
                                returnValues.push([i,posY]);
                            }else{
                                if(board.variables.initBoard[i][posY] < 7){
                                    returnValues.push([i,posY]);
                                }
                            }
                            break;
                        }
                    }
                    return returnValues;
                    break;
            }
        },
        aiMoveBlack: function(){
            board.variables.move++;

            //create a temporary board
            var currBoard = board;
            var savPos = [-10000,-1,[-1,-1]];

            if(currBoard.variables.move % 2  != 0){
                console.log("Failed");
                return;
            }

            //note this code is not symmetric and does not yet work for white to move

            //check if in check
            var attackingPieces = currBoard.methods.checkForCheck();
            if(attackingPieces.length  == 0){

                //code for all moves
                for(var i = 0;i<8;i++){
                    for(var j = 0;j<8;j++){
                        if(currBoard.variables.initBoard[i][j]<7 && currBoard.variables.initBoard[i][j] != 0){
                            var positions = currBoard.methods.getValidPositions(board.variables.initBoard[i][j],i,j,false);
                            for(var g=0;g<positions.length;g++){

                                //prevent modification of local function board enabling reuse for multiple moves.
                                var tempBoard = currBoard;

                                //check for taken pieces
                                if(tempBoard.variables.initBoard[positions[g][0]][positions[g][1]] != 0){
                                    tempBoard.variables.killList.push(tempBoard.variables.initBoard[positions[g][0]][positions[g][1]]);
                                }

                                //complete the move
                                tempBoard.variables.initBoard[positions[g][0]][positions[g][1]] = tempBoard.variables.initBoard[i][j];
                                tempBoard.variables.initBoard[i][j] = 0;
                                tempBoard.variables.move++;

                                //evaluate the tree descent value
                                var evalValue = board.methods.recursiveTreeDescent(tempBoard,2);
                                if( evalValue > savPos[0]){
                                    savPos[0] = evalValue;
                                    savPos[1] = tempBoard.variables.initBoard[positions[g][0]][positions[g][1]];
                                    savPos[2] = [positions[g][0],positions[g][1]];

                                }
                            }
                        }
                    }
                }
            }else{

                //in check logic
                var kingpos;
                var blockingPositions = 0;

                //get king position
                for(var w=0;w<8;w++){
                    for(var f=0;f<8;f++){
                        if(currBoard.variables.initBoard[w][f] == 2){
                            kingpos = [w,f];
                        }

                    }
                }

                //if it is possible to block the check
                if(attackingPieces.length < 2 && attackingPieces[0][0] != 3 && attackingPieces[0][0] != 9){
                    //for all black pieces check if they can block
                    for(var x=0;x<8;x++){
                        for(var y=0;y<8;y++){
                            if(currBoard.variables.initBoard[x][y] < 7 && currBoard.variables.initBoard[x][y] != 0){
                                var allPositions = currBoard.getValidPositions(currBoard.variables.initBoard[x][y],x,y,false);
                                for(var e=0;e<allPositions.length;e++){
                                    if(((kingpos[0]-allPositions[e][0])/(kingpos[0]-attackingPieces[0][1])) == ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) >= 0 && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) <= 1){
                                        
                                        blockingPositions++;

                                        //prevent modification of local function board enabling reuse for multiple moves.
                                        var tempBoard = currBoard;

                                        //check for taken pieces
                                        if(tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]] != 0){
                                            tempBoard.variables.killList.push(tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]]);
                                        }

                                        //complete the move
                                        tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]] = tempBoard.variables.initBoard[x][y];
                                        tempBoard.variables.initBoard[x][y] = 0;
                                        tempBoard.variables.move++;

                                        //evaluate the tree descent value
                                        var evalValue = board.methods.recursiveTreeDescent(tempBoard,2);
                                        if( evalValue > savPos[0]){
                                            savPos[0] = evalValue;
                                            savPos[1] = tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]];
                                            savPos[2] = [allPositions[e][0],allPositions[e][1]];

                                        }

                                    }
                                }
                            }
                        }
                    }
                }

                //include movements for the king if king has no valid positions and there are no blocking positions it is checkmate
                var kingPositions = currBoard.getValidPositions(currBoard.variables.initBoard[kingpos[0]][kingpos[1]],kingpos[0],kingpos[1],false);
                if(kingPositions.length == 0 && blockingPositions == 0){
                    console.log("checkmate");
                    return -1000;
                }else{
                    for(var e=0;e<kingPositions.length;e++){
                        //check for taken pieces
                        if(tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]] != 0){
                            tempBoard.variables.killList.push(tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]]);
                        }

                        //complete the move
                        tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]] = tempBoard.variables.initBoard[kingpos[0]][kingpos[1]];
                        tempBoard.variables.initBoard[kingpos[0]][kingpos[1]] = 0;
                        tempBoard.variables.move++;

                        //evaluate the tree descent value
                        var evalValue = board.methods.recursiveTreeDescent(tempBoard,2);
                        if( evalValue > savPos[0]){
                            savPos[0] = evalValue;
                            savPos[1] = tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]];
                            savPos[2] = [kingPositions[e][0],kingPositions[e][1]];
                        }
                    }
                }

            }

            //log evaluated position for debugging
            console.log(savPos);
            //run saved position to the board
        },
        recursiveTreeDescent: function(currBoard,depth){
            depth--;
            

            //check end of tree return values of depth
            if(depth == 0){
                var sum = 0;
                for(var i =0;i<currBoard.variables.killList.length;i++){
                    switch (currBoard.variables.killList[i]){
                        case 1:
                            sum -= 3;
                            break;
                        case 2:
                            console.log("Failed kill list logic");
                            break;
                        case 3:
                            sum -= 3;
                            break;
                        case 4:
                            sum -= 1;
                            break;
                        case 5:
                            sum -= 9;
                            break;
                        case 6:
                            sum -= 5;
                            break;
                        case 7:
                            sum += 3;
                            break;
                        case 8:
                            console.log("failed chess logic");
                            break;
                        case 9:
                            sum += 3;
                            break;
                        case 10:
                            sum += 1;
                            break;
                        case 11:
                            sum += 9;
                            break;
                        case 12:
                            sum += 5;
                            break;

                    }
                }
                return sum;
            }

            //minimize
            if(currBoard.variables.move % 2 == 0){
                var savPos = [10000,-1,[-1,-1]];
                //check if in check
                var attackingPieces = currBoard.methods.checkForCheck();
                if(attackingPieces.length  == 0){

                    //code for all moves
                    for(var i = 0;i<8;i++){
                        for(var j = 0;j<8;j++){
                            if(currBoard.variables.initBoard[i][j]>6){
                                var positions = currBoard.methods.getValidPositions(board.variables.initBoard[i][j],i,j,false);
                                for(var g=0;g<positions.length;g++){

                                    //prevent modification of local function board enabling reuse for multiple moves.
                                    var tempBoard = currBoard;

                                    //check for taken pieces
                                    if(tempBoard.variables.initBoard[positions[g][0]][positions[g][1]] != 0){
                                        tempBoard.variables.killList.push(tempBoard.variables.initBoard[positions[g][0]][positions[g][1]]);
                                    }

                                    //complete the move
                                    tempBoard.variables.initBoard[positions[g][0]][positions[g][1]] = tempBoard.variables.initBoard[i][j];
                                    tempBoard.variables.initBoard[i][j] = 0;
                                    tempBoard.variables.move++;

                                    //evaluate the tree descent value
                                    var evalValue = board.methods.recursiveTreeDescent(tempBoard,depth);
                                    if( evalValue < savPos[0]){
                                        savPos[0] = evalValue;
                                        savPos[1] = tempBoard.variables.initBoard[positions[g][0]][positions[g][1]];
                                        savPos[2] = [positions[g][0],positions[g][1]];

                                    }
                                }
                            }
                        }
                    }
                }else{

                    //in check logic
                    var kingpos;
                    var blockingPositions = 0;

                    //get king position
                    for(var w=0;w<8;w++){
                        for(var f=0;f<8;f++){
                            if(currBoard.variables.initBoard[w][f] == 8){
                                kingpos = [w,f];
                            }

                        }
                    }

                    //if it is possible to block the check
                    if(attackingPieces.length < 2 && attackingPieces[0][0] != 3 && attackingPieces[0][0] != 9){
                        //for all black pieces check if they can block
                        for(var x=0;x<8;x++){
                            for(var y=0;y<8;y++){
                                if(currBoard.variables.initBoard[x][y] > 6){
                                    var allPositions = currBoard.getValidPositions(currBoard.variables.initBoard[x][y],x,y,false);
                                    for(var e=0;e<allPositions.length;e++){
                                        if(((kingpos[0]-allPositions[e][0])/(kingpos[0]-attackingPieces[0][1])) == ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) >= 0 && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) <= 1){
                                            
                                            blockingPositions++;

                                            //prevent modification of local function board enabling reuse for multiple moves.
                                            var tempBoard = currBoard;

                                            //check for taken pieces
                                            if(tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]] != 0){
                                                tempBoard.variables.killList.push(tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]]);
                                            }

                                            //complete the move
                                            tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]] = tempBoard.variables.initBoard[x][y];
                                            tempBoard.variables.initBoard[x][y] = 0;
                                            tempBoard.variables.move++;

                                            //evaluate the tree descent value
                                            var evalValue = board.methods.recursiveTreeDescent(tempBoard,depth);
                                            if( evalValue < savPos[0]){
                                                savPos[0] = evalValue;
                                                savPos[1] = tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]];
                                                savPos[2] = [allPositions[e][0],allPositions[e][1]];

                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }

                    //include movements for the king if king has no valid positions and there are no blocking positions it is checkmate
                    var kingPositions = currBoard.getValidPositions(currBoard.variables.initBoard[kingpos[0]][kingpos[1]],kingpos[0],kingpos[1],false);
                    if(kingPositions.length == 0 && blockingPositions == 0){
                        console.log("checkmate");
                        return -1000;
                    }else{
                        for(var e=0;e<kingPositions.length;e++){
                            //check for taken pieces
                            if(tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]] != 0){
                                tempBoard.variables.killList.push(tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]]);
                            }

                            //complete the move
                            tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]] = tempBoard.variables.initBoard[kingpos[0]][kingpos[1]];
                            tempBoard.variables.initBoard[kingpos[0]][kingpos[1]] = 0;
                            tempBoard.variables.move++;

                            //evaluate the tree descent value
                            var evalValue = board.methods.recursiveTreeDescent(tempBoard,depth);
                            if( evalValue > savPos[0]){
                                savPos[0] = evalValue;
                                savPos[1] = tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]];
                                savPos[2] = [kingPositions[e][0],kingPositions[e][1]];
                            }
                        }
                    }

                }
            }
            //maximise 
            //yuck code duplication
            else{
                //check if in check
                var attackingPieces = currBoard.methods.checkForCheck();
                var savPos = [-10000,-1,[-1,-1]];
                if(attackingPieces.length  == 0){

                    //code for all moves
                    for(var i = 0;i<8;i++){
                        for(var j = 0;j<8;j++){
                            if(currBoard.variables.initBoard[i][j]<7 && currBoard.variables.initBoard[i][j] != 0){
                                var positions = currBoard.methods.getValidPositions(board.variables.initBoard[i][j],i,j,false);
                                for(var g=0;g<positions.length;g++){

                                    //prevent modification of local function board enabling reuse for multiple moves.
                                    var tempBoard = currBoard;

                                    //check for taken pieces
                                    if(tempBoard.variables.initBoard[positions[g][0]][positions[g][1]] != 0){
                                        tempBoard.variables.killList.push(tempBoard.variables.initBoard[positions[g][0]][positions[g][1]]);
                                    }

                                    //complete the move
                                    tempBoard.variables.initBoard[positions[g][0]][positions[g][1]] = tempBoard.variables.initBoard[i][j];
                                    tempBoard.variables.initBoard[i][j] = 0;
                                    tempBoard.variables.move++;

                                    //evaluate the tree descent value
                                    var evalValue = board.methods.recursiveTreeDescent(tempBoard,depth);
                                    if( evalValue > savPos[0]){
                                        savPos[0] = evalValue;
                                        savPos[1] = tempBoard.variables.initBoard[positions[g][0]][positions[g][1]];
                                        savPos[2] = [positions[g][0],positions[g][1]];

                                    }
                                }
                            }
                        }
                    }
                }else{

                    //in check logic
                    var kingpos;
                    var blockingPositions = 0;

                    //get king position
                    for(var w=0;w<8;w++){
                        for(var f=0;f<8;f++){
                            if(currBoard.variables.initBoard[w][f] == 2){
                                kingpos = [w,f];
                            }

                        }
                    }

                    //if it is possible to block the check
                    if(attackingPieces.length < 2 && attackingPieces[0][0] != 3 && attackingPieces[0][0] != 9){
                        //for all black pieces check if they can block
                        for(var x=0;x<8;x++){
                            for(var y=0;y<8;y++){
                                if(currBoard.variables.initBoard[x][y] < 7 && currBoard.variables.initBoard[x][y] != 0){
                                    var allPositions = currBoard.getValidPositions(currBoard.variables.initBoard[x][y],x,y,false);
                                    for(var e=0;e<allPositions.length;e++){
                                        if(((kingpos[0]-allPositions[e][0])/(kingpos[0]-attackingPieces[0][1])) == ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) >= 0 && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) <= 1){
                                            
                                            blockingPositions++;

                                            //prevent modification of local function board enabling reuse for multiple moves.
                                            var tempBoard = currBoard;

                                            //check for taken pieces
                                            if(tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]] != 0){
                                                tempBoard.variables.killList.push(tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]]);
                                            }

                                            //complete the move
                                            tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]] = tempBoard.variables.initBoard[x][y];
                                            tempBoard.variables.initBoard[x][y] = 0;
                                            tempBoard.variables.move++;

                                            //evaluate the tree descent value
                                            var evalValue = board.methods.recursiveTreeDescent(tempBoard,depth);
                                            if( evalValue > savPos[0]){
                                                savPos[0] = evalValue;
                                                savPos[1] = tempBoard.variables.initBoard[allPositions[e][0]][allPositions[e][1]];
                                                savPos[2] = [allPositions[e][0],allPositions[e][1]];

                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }

                    //include movements for the king if king has no valid positions and there are no blocking positions it is checkmate
                    var kingPositions = currBoard.getValidPositions(currBoard.variables.initBoard[kingpos[0]][kingpos[1]],kingpos[0],kingpos[1],false);
                    if(kingPositions.length == 0 && blockingPositions == 0){
                        console.log("checkmate");
                        return -1000;
                    }else{
                        for(var e=0;e<kingPositions.length;e++){
                            //check for taken pieces
                            if(tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]] != 0){
                                tempBoard.variables.killList.push(tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]]);
                            }

                            //complete the move
                            tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]] = tempBoard.variables.initBoard[kingpos[0]][kingpos[1]];
                            tempBoard.variables.initBoard[kingpos[0]][kingpos[1]] = 0;
                            tempBoard.variables.move++;

                            //evaluate the tree descent value
                            var evalValue = board.methods.recursiveTreeDescent(tempBoard,depth);
                            if( evalValue > savPos[0]){
                                savPos[0] = evalValue;
                                savPos[1] = tempBoard.variables.initBoard[kingPositions[e][0]][kingPositions[e][1]];
                                savPos[2] = [kingPositions[e][0],kingPositions[e][1]];
                            }
                        }
                    }

                }
            }

            //check for checkmate value 1000
            
            

            
    
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

    //checking inside the grid
    if(coX != -1 && coY != -1){
        if(board.variables.initBoard[coY][coX] == 0){
            return;
        }else{
            allPositions = board.methods.getValidPositions(board.variables.initBoard[coY][coX],coY,coX,false);
        }
    }else{
        return;
    }

    //check logic
    var attackingPieces = board.methods.checkForCheck();
    var blockingPositions = [];
    if(attackingPieces.length > 0){
        var pass = false;
        var kingpos;
        if(board.variables.move % 2 == 0){
            for(var w=0;w<8;w++){
                for(var f=0;f<8;f++){
                    if(board.variables.initBoard[w][f] == 8){
                        kingpos = [w,f];
                    }

                }
            }
        }else{
            for(var w=0;w<8;w++){
                for(var f=0;f<8;f++){
                    if(board.variables.initBoard[w][f] == 2){
                        kingpos = [w,f];
                    }

                }
            }
        }

        //board.variables.initBoard[coX][coY]
        //check if we can block
        console.log("in check");
        if(attackingPieces.length < 2 && attackingPieces[0][0] != 3 && attackingPieces[0][0] != 9){
            for(var e=0;e<allPositions.length;e++){
                //using vector scalar transformation to check if point is on the line
                //value will be some positive fraction if it lies between the two points
                if(((kingpos[0]-allPositions[e][0])/(kingpos[0]-attackingPieces[0][1])) == ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) >= 0 && ((kingpos[1]-allPositions[e][1])/(kingpos[1]-attackingPieces[0][2])) <= 1){
                    blockingPositions.push([allPositions[e][0],allPositions[e][1]]);
                    pass = true;
                }
            }
        }
        if(blockingPositions.length == 0){
            //cant block must move king
            if(board.variables.initBoard[coY][coX] == 8 || board.variables.initBoard[coY][coX] == 2){
                if(allPositions.length != 0){
                    blockingPositions = allPositions;
                    pass = true;
                }else{
                    console.log("king possibly checkmate");
                }
            }
        }
        if(pass){allPositions = blockingPositions;}
        else{return;}
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
            board.variables.killList.push(board.variables.initBoard[relY][relX]);
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
