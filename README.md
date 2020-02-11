# MiniMax Chess Engine - [Project Board](https://github.com/users/achen4824/projects/1)

A side project which was creating a AI for a turn based game *(chess)* using the [minimax](https://en.wikipedia.org/wiki/Minimax) principles. This project was inspired by **Code Bullet** in [this video](https://www.youtube.com/watch?v=DZfv0YgLJ2Q). Several improvements over Code Bullet's AI include: 
* Avoiding Checkmate
* Illegally Taking the King
* Moving Pinned Pieces
* Moving into Check
* Ability to take Pieces attacking King
* Moving other pieces while in Check

**Usage:** Clone the Repository and open the HTML file. 

## Board Variables

* **initBoard** - Contains the Cartesian Coordinates of all piece locations in the 8X8 Board. 
* **move** - Contains the board's current move count used to keep track of current player's move. This is necessary for minimax as simulating future moves means keeping track of both sides of the board.
* **killList** - Contains pieces currently removed from the board. Used to determine the amount of points each player has.

## Board Methods - Add Images

Every method is called in a certain order for each move. The first method is:
* **checkForCheck** - This method ensures that the king is not currently in check which restricts specific pieces from being played. If the king is in check the next method is called.
* **checkForBlock** - This method returns all pieces that can be used to block the check. When the king is in check we create an array of pieces and their possible moves that block check. The moves that block check can be determine by drawing a line and calculating if the point lies on that line. Like this:
```
  [x,y] + vt = [px,py]
  x + t*vx = px
  y + t*vy = py
```
If t is the same then the point lies on the line. Then starting at the king and iterating the normalized vector outwards we can determine whether the move lies between the attacking piece and the king. 
```javascript
  //check if the order (king, your piece, opponents attacking piece) exists
  var i = kingpos[0] + kingvector[0];
  var j = kingpos[1] + kingvector[1];
  var first = false;
  var orderIsCorrect = false;
  do{
      //console.log(kingvector[0],kingvector[1],i,j,this.initBoard[i][j]);
      if(this.initBoard[i][j] != 0){
          if(!first && order[0] == this.initBoard[i][j]){
              first = true;
          }else if(first && (order[1][0] == this.initBoard[i][j] || order[1][1] == this.initBoard[i][j])){
              orderIsCorrect = true;
              break;
          }else {
              return allPositions;
          }
      }
      i += kingvector[0];
      j += kingvector[1];
  }while(i>=0 && j>=0 && i<8 && j<8);
```

### Javascript Object Duplication - Fix
The way javascript passes objects around are solely by reference as such a work around was created. It being put here as a future example. 
```javascript
  function clone(src){
      var temp = Object.create(board);
      temp.move = src.move;
      temp.killList = [];
      temp.initBoard = [[],[],[],[],[],[],[],[]];

      for(var i=0;i<src.killList.length;i++){
          temp.killList.push(src.killList[i]);
      }

      for(var x=0;x<8;x++){
          for(var y=0;y<8;y++){
              temp.initBoard[x].push(src.initBoard[x][y]);
          }
      }

      return temp;
  }

```

## Issues
* **Javascript Object Duplication** - [#1](/../../issues/1)
* **Taking the King and continuing the game** - [#2](/../../issues/2)
* **Infinite Loops** - [#3](/../../issues/3)
* **All of the improvements over [Code Bullet's]() AI were once issues.**
