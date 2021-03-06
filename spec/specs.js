describe('Player', function() {
  it("initializes a player", function() {
    var player1 = new Player("Clare", "x");
    expect(player1.userName).to.equal("Clare");
    expect(player1.mark).to.equal("x");
    expect(player1.game).to.equal('no game')
  });

  it("marks a space", function() {
    var clare1 = new Player("Clare", "x");
    var cory2 = new Player("Cory", "o");
    var newGame = new Game(clare1, cory2);
    clare1.placeMark(1,2);
    expect(newGame.board.spaces[1][2].contains).to.equal('x');
  });
});

describe('Space', function() {
  it("initializes a space", function() {
    var bottomLeft = new Space([0, 0], ' ');
    expect(bottomLeft.coordinates).to.eql([0,0]);
    expect(bottomLeft.contains).to.equal(' ');
  });
});

describe('Board', function() {
  it("initalizes a board", function() {
    var newBoard = new Board();
    var topLeft = new Space([0,2], ' ');
    expect(newBoard.spaces[0][2]).to.eql(topLeft);

    var space1 = new Space([0,0], ' ');
    var space2 = new Space([1,0], ' ');
    var space3 = new Space([2,0], ' ');
    var firstCombo = new WinningCombo(space1, space2, space3);
    expect(newBoard.winningCombos[0]).to.eql(firstCombo);

    var space4 = new Space([2,0], ' ');
    var space5 = new Space([2,1], ' ');
    var space6 = new Space([2,2], ' ');
    var sixthCombo = new WinningCombo(space4, space5, space6);
    expect(newBoard.winningCombos[5]).to.eql(sixthCombo);

    var space7 = new Space([0,0], ' ');
    var space8 = new Space([1,1], ' ');
    var space9 = new Space([2,2], ' ');
    var eighthCombo = new WinningCombo(space7, space8, space9);
    expect(newBoard.winningCombos[7]).to.eql(eighthCombo);

    var space10 = new Space([2,0], ' ');
    var space11 = new Space([1,1], ' ');
    var space12 = new Space([0,2], ' ');
    var seventhCombo = new WinningCombo(space10, space11, space12);
    expect(newBoard.winningCombos[6]).to.eql(seventhCombo);
  });
});

describe('Game', function() {
  it("initializes a game", function() {
    var clare = new Player("Clare", "x");
    var cory = new Player("Cory", "o");
    var newGame = new Game(clare, cory);
    expect(newGame.player1).to.equal(clare);
    expect(newGame.player2).to.equal(cory);
    var myBoard = new Board()
    expect(newGame.board).to.eql(myBoard);
    expect(clare.game).to.equal(newGame);
    expect(newGame.winner).to.equal('none');
  });
});

describe('WinningCombo', function() {
  it('initializes a winning combo', function() {
    var WinningComboA = new WinningCombo(new Space([0,0], ' '),
                                          new Space([0,1], ' '),
                                          new Space([0,2], ' ')
    );
    expect(WinningComboA.spaces).to.eql([new Space([0,0], ' '),
                                          new Space([0,1], ' '),
                                          new Space([0,2], ' ')])
  });

  it("checks if winning combo is not full", function() {
    var spaceA = new Space([0,0], ' ')
    var spaceB = new Space([0,1], ' ')
    var spaceC = new Space([0,2], ' ')
    var winningComboA = new WinningCombo(spaceA, spaceB, spaceC);
    expect(winningComboA.full()).to.equal(false);
  });

  it("checks if winning combo is full", function() {
    var spaceA = new Space([0,0], 'x')
    var spaceB = new Space([0,1], 'x')
    var spaceC = new Space([0,2], 'o')
    var winningComboA = new WinningCombo(spaceA, spaceB, spaceC);
    expect(winningComboA.full()).to.equal(true);
  });

  it("handles a partially filled winning combo", function() {
    var spaceA = new Space([0,0], 'x')
    var spaceB = new Space([0,1], ' ')
    var spaceC = new Space([0,2], 'o')
    var winningComboA = new WinningCombo(spaceA, spaceB, spaceC);
    expect(winningComboA.full()).to.equal(false);
  });

  it("returns the winner if they exist", function() {
    var spaceA = new Space([0,0], 'x')
    var spaceB = new Space([0,1], 'x')
    var spaceC = new Space([0,2], 'x')
    var winningComboA = new WinningCombo(spaceA, spaceB, spaceC);
    expect(winningComboA.comboWinner()).to.equal('x');
  });

  it("lets us know if no one has won", function() {
    var spaceA = new Space([0,0], 'x')
    var spaceB = new Space([0,1], 'o')
    var spaceC = new Space([0,2], 'x')
    var winningComboA = new WinningCombo(spaceA, spaceB, spaceC);
    expect(winningComboA.comboWinner()).to.equal("There is no winner.");
  });
});
