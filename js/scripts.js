// Next step is to loop through the winning combo array
// (which is board.winningCombos) and to check if each combo is full (using the
// winningCombo.full function.).
// If it is full, then check if it has a winner (using the
// winningCombo.comboWinner function) (By the way, winningCombo.comboWinner
// returns "x" or "o" and not the player name). <3



var Player = function(userName, mark) {
  this.userName = userName;
  this.mark = mark;
  this.game = 'no game';
};

Player.prototype.placeMark = function(x, y) {
  this.game.board.spaces[x][y].contains = this.mark;
};

var Space = function(coordinates, contains) {
  this.coordinates = coordinates;
  this.contains = contains;
};

var WinningCombo = function(space1, space2, space3) {
  this.spaces = [space1, space2, space3];
  var marks = ''
  this.spaces.forEach(function(space) {
    marks = marks + space.contains;
  });
  this.marks = marks;
};

WinningCombo.prototype.full = function() {
  // if at least one empty, then false, otherwise true
  if (this.marks.search(' ') >= 0) {
    return false;
  } else {
    return true;
  };
};

WinningCombo.prototype.comboWinner = function() {

  if ((this.marks[0] === this.marks[1]) && this.marks[2] === this.marks[1]) {
    return this.marks[0];
  } else {
    return "There is no winner.";
  };
};



var Board = function() {
  this.spaces = [ [new Space([0,0], ' '), new Space([0,1], ' '), new Space([0,2], ' ')],
                  [new Space([1,0], ' '), new Space([1,1], ' '), new Space([1,2], ' ')],
                  [new Space([2,0], ' '), new Space([2,1], ' '), new Space([2,2], ' ')] ]
  this.winningCombos = [];

  //horizontal loop, relative to above:
  for (var y=0; y<3; y++) {
    //x loop:
    var spaces = []
    for (var x=0; x<3; x++) {
      spaces.push(new Space([x,y], ' '))
    }
    this.winningCombos.push(new WinningCombo(spaces[0], spaces[1], spaces[2]))
  };

  //vertical loop, relative to above:
  for (var x=0; x<3; x++) {
    //y loop:
    var spaces = [];
    for (var y=0; y<3; y++) {
      spaces.push(new Space([x,y], ' '));
    };
    this.winningCombos.push(new WinningCombo(spaces[0], spaces[1], spaces[2]));
  };

  //diagonal loop1:
  var spaces = [];
  for (var x=2, y=0; y<3; x--, y++) {
      spaces.push(new Space([x,y], ' '));
  };
  this.winningCombos.push(new WinningCombo(spaces[0], spaces[1], spaces[2]));

  //diagonal loop2:
  var spaces = [];
  for (var i=0; i<3; i++) {
    spaces.push(new Space([i,i], ' '));
  };
  this.winningCombos.push(new WinningCombo(spaces[0], spaces[1], spaces[2]));
};

var Game = function(player1, player2) {
  this.player1 = player1;
  player1.game = this;
  this.player2 = player2;
  player2.game = this;
  this.board = new Board();
  this.winner = 'none';
};

// Game.prototype.gameOverCheck = function() {
//
// };
