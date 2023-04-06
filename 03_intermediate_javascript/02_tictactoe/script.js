const Player = function (name, markType) {
  let status = false; //false for inactive and true for active
  score = 0;
  return {
    name,
    markType,
    status,
    updateStatus() {
      this.status = !status;
    },
    updateScore() {
      this.score++;
    },
  };
};

const GameBoard = () => {
  //initialize game board array
  let board;
  const initializeBoard = () => {
    board = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push("");
      }
      board.push(row);
    }
  };

  const updateBoard = (rowIdx, colIdx, value) => {
    console.log("updateboard with ", rowIdx, colIdx);
    board[rowIdx][colIdx] = value;
  };

  const printBoard = () => console.log(board);

  const getEmptyCells = () => {
    emptyIndices = [];
    board.forEach((row, rowIdx) =>
      row.forEach((cell, colIdx) => {
        if (cell === "") emptyIndices.push([rowIdx, colIdx]);
      })
    );
    return emptyIndices;
  };

  // const getRandomEmptyCell = (emptyIndices) =>
  //   emptyIndices[Math.floor(Math.random() * emptyIndices.length())];

  const getRandomEmptyCell = () => {
    const emptyIndices = getEmptyCells();
    console.log("empty cell indices: ", emptyIndices);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const countEmptyCell = () => {
    let total = 0;
    board.forEach((row) =>
      row.forEach((cell) => {
        if (cell === "") total++;
      })
    );
    return total;
  };

  const checkBoard = (mark) => {
    //determine if there is a line containing all 3 mark of the same type(win situation)
    let has_winner = false;
    // by row
    has_winner = board.some((row) => row.every((cell) => cell === mark));
    //by col
    if (!has_winner) {
      col_sum = [0, 0, 0];
      board.forEach((row) =>
        row.forEach((cell, cell_index) => {
          if (cell === mark) col_sum[cell_index]++;
        })
      );
      has_winner = col_sum.some((col) => col === 3);
    }
    // by diagonal
    if (!has_winner) {
      diagonal_sum = [0, 0]; // for left and right diagonal
      diag_index = 0;
      //diagonal left side
      board.forEach((row) => {
        row.forEach((cell, cell_index) => {
          if (cell_index === diag_index) {
            if (cell === mark) diagonal_sum[0]++;
          }
        });
        diag_index++;
      });
      //diagonal right side
      board.forEach((row) => {
        row.forEach((cell, cell_index) => {
          if (cell_index === diag_index) {
            if (cell === mark) diagonal_sum[1]++;
          }
        });
        diag_index--;
      });
      has_winner = diagonal_sum.indexOf(3) !== -1;
    }
    console.log(has_winner);
    return has_winner;
  };

  return {
    printBoard,
    countEmptyCell,
    initializeBoard,
    updateBoard,
    checkBoard,
    getEmptyCells,
    getRandomEmptyCell,
  };
};

const GameController = (...players) => {
  // pick a random player to start the game
  let playerActiveIdx = Math.round(Math.random());
  let gameBoard = GameBoard();
  gameBoard.initializeBoard();

  const getActivePlayerIdx = () => playerActiveIdx;

  const getActivePlayerMark = () => players[playerActiveIdx].markType;

  const playerCheckMark = (rowIndex, colIndex) => {
    const currentPlayer = players[playerActiveIdx];
    gameBoard.updateBoard(rowIndex, colIndex, currentPlayer.markType);
    currentPlayer.updateStatus();
    gameBoard.printBoard();

    // switch to other player
    playerActiveIdx = playerActiveIdx === 1 ? 0 : 1;

    console.log("playerIdx after switch", playerActiveIdx);
  };

  const canGameEnd = () => gameBoard.countEmptyCell === 0;
  const otherPlayerPlay = () => {
    randomIndices = gameBoard.getRandomEmptyCell();
    const activePlayerMark = getActivePlayerMark();
    console.log("random cell: ", randomIndices);
    playerCheckMark(...randomIndices);
    return { indices: randomIndices, markType: activePlayerMark };
  };

  // const restartGame = () => (gameBoard = GameBoard());
  const restartGame = () => gameBoard.initializeBoard();
  const hasWinner = (markType) => gameBoard.checkBoard(markType);
  return {
    playerCheckMark,
    getActivePlayerIdx,
    otherPlayerPlay,
    getActivePlayerMark,
    restartGame,
    hasWinner,
    canGameEnd,
  };
};

(function (document) {
  const starterSection = document.getElementById("section-starter");
  const userAndMachineBtn = document.getElementById("user-vs-machine");
  const userAndUser = document.getElementById("user-vs-user");
  const signs = document.getElementsByName("user-sign-selection");
  //game
  const gameSection = document.getElementById("game-section");
  const userScoreDiv = document.getElementById("display-user");
  const otherUserScoreDiv = document.getElementById("display-other-user");
  const resetBtn = document.getElementById("reset-btn");
  const turnDisplayDiv = document.getElementById("turn-update");
  let gameController;

  // game
  const cells = document.querySelectorAll(".cell");

  //
  let userSignSelection = "";
  // in firefox the radio button is automatically checked
  signs.forEach((sign) => {
    if (sign.checked) userSignSelection = sign.id;
  });

  signs.forEach(
    (sign) =>
      (sign.onclick = (e) => {
        userSignSelection = sign.id;
      })
  );

  userAndMachineBtn.onclick = (e) => displayGame(e);

  userAndUser.onclick = (e) => displayGame(e);

  const updateScreen = (indices, markType) => {
    // console.log("marktype", markType, indices);
    cells.forEach((cell) => {
      if (
        Number(cell.dataset.row) === indices[0] + 1 &&
        Number(cell.dataset.col) === indices[1] + 1
      ) {
        const markDiv = document.createElement("div");
        markDiv.classList.add(`cell-mark-${markType}`);
        cell.classList.add("disabled-pointer");
        cell.appendChild(markDiv);
      }
    });
  };

  const updateTurn = (markType) => (turnDisplayDiv.innerText = `${markType}`);

  const displayQuestion = () => {
    // ask user if they want to continue the game or not
  };
  const displayGame = (e) => {
    console.log("user select sign: ", userSignSelection);
    if (userSignSelection === "sign-x") {
      userScoreDiv.classList.add("x");
      otherUserScoreDiv.classList.add("o");
    } else {
      userScoreDiv.classList.add("o");
      otherUserScoreDiv.classList.add("x");
    }
    const userMarkSign = userSignSelection === "sign-x" ? "X" : "O";

    const userPlayer = Player("user", userMarkSign);
    const otherSign = userMarkSign === "X" ? "O" : "X";
    let otherPlayer;
    if (e.target === userAndMachineBtn) {
      otherPlayer = Player("machine", otherSign);
    } else {
      otherPlayer = Player("otherUser", otherSign);
    }
    console.log(userPlayer, otherPlayer);
    starterSection.classList.add("disabled");
    gameSection.classList.remove("disabled");

    //start game

    startGame(userPlayer, otherPlayer);
  };

  const startGame = (userPlayer, otherPlayer) => {
    gameController = GameController(userPlayer, otherPlayer);
    let activePlayerIdx = gameController.getActivePlayerIdx();
    console.log("active player idx: ", activePlayerIdx);
    updateTurn(gameController.getActivePlayerMark());
    //start Case 1: user vs machine
    // if (activePlayerIdx === 1) {
    //   let { indices, markType } = gameController.otherPlayerPlay();
    //   updateScreen(indices, markType);
    // }

    // start case 1: user vs another user
    cells.forEach(
      (cell) =>
        (cell.onclick = (e) => {
          const rowIdx = Number(e.target.dataset.row) - 1;
          const colIdx = Number(e.target.dataset.col) - 1;
          const markType = gameController.getActivePlayerMark();
          gameController.playerCheckMark(rowIdx, colIdx);
          updateScreen([rowIdx, colIdx], markType);
          if (gameController.hasWinner(markType)) {
          }
          if (gameController) updateTurn(gameController.getActivePlayerMark());
        })
    );
  };

  resetBtn.onclick = (e) => {
    gameController.restartGame();
    const cellMarks = document.querySelectorAll('div[class^="cell-mark-"]');
    cellMarks.forEach((cell) => {
      cell.parentNode.removeChild(cell);
    });
    // remove disabled class
    document
      .querySelectorAll(".disabled-pointer")
      .forEach((div) => div.classList.remove("disabled-pointer"));
  };
})(document);
