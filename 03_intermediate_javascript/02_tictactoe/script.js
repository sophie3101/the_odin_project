const Player = function (name, markType, type) {
  let status = false; //false for inactive and true for active
  score = 0;
  return {
    name,
    markType,
    score,
    type,
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
    console.log("playActiveidx", playerActiveIdx);
    const currentPlayer = players[playerActiveIdx];
    gameBoard.updateBoard(rowIndex, colIndex, currentPlayer.markType);
    currentPlayer.updateStatus();
    gameBoard.printBoard();

    // switch to other player
    playerActiveIdx = playerActiveIdx === 1 ? 0 : 1;

    console.log("currentPlayer idx ", playerActiveIdx);
  };

  const canGameEnd = () => gameBoard.countEmptyCell() === 0;

  const otherPlayerPlay = () => {
    randomIndices = gameBoard.getRandomEmptyCell();
    const activePlayerMark = getActivePlayerMark();
    // console.log("random cell: ", randomIndices);
    playerCheckMark(...randomIndices);
    return { indices: randomIndices, markType: activePlayerMark };
  };

  // const restartGame = () => (gameBoard = GameBoard());
  const restartGame = () => gameBoard.initializeBoard();

  const hasWinner = (markType) => gameBoard.checkBoard(markType);

  const getWinnerName = (markType) => {
    const winnerPlayer = players.find((player) => player.markType === markType);
    const winnerName = winnerPlayer.name;

    // update score for winner
    winnerPlayer.updateScore();

    return winnerName;
  };

  return {
    playerCheckMark,
    getActivePlayerIdx,
    otherPlayerPlay,
    getActivePlayerMark,
    restartGame,
    hasWinner,
    canGameEnd,
    getWinnerName,
  };
};

(function (document) {
  const userAndMachineBtn = document.getElementById("user-vs-machine");
  const userAndUser = document.getElementById("user-vs-user");
  const starterSection = document.getElementById("section-starter");
  const gameSection = document.getElementById("game-section");

  let gameController;

  const signsBtn = document.querySelectorAll("button[type='button']");
  console.log(signsBtn);
  // game
  const userScoreDiv = document.getElementById("display-user");
  const otherUserScoreDiv = document.getElementById("display-other-user");
  const tieScoreP = document.getElementById("ties-score");
  const cells = document.querySelectorAll(".cell");

  let userSignSelection = "";

  signsBtn.forEach(
    (sign) =>
      (sign.onclick = (e) => {
        console.log(e);
        console.log(sign.dataset.icon);
        userSignSelection = sign.dataset.icon;
      })
  );

  userAndMachineBtn.onclick = (e) => displayGame(e);

  userAndUser.onclick = (e) => displayGame(e);

  const showHomeScreen = () => {
    gameSection.classList.add("disabled");
    starterSection.classList.remove("disabled");
  };

  const showGameScreen = () => {
    starterSection.classList.add("disabled");
    gameSection.classList.remove("disabled");
  };

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

  const updateTurn = (markType) => {
    const turnDisplayDiv = document.getElementById("turn-update-content");
    turnDisplayDiv.innerText = `${markType}`;
  };

  const createElement = (elementType, text, idName) => {
    let ele = document.getElementById(idName);
    if (ele === null) ele = document.createElement(elementType);

    if (idName.length !== 0) ele.setAttribute("id", idName);
    ele.innerHTML = text;

    return ele;
  };

  const displayGame = (e) => {
    if (userSignSelection === "") return;
    console.log("user select sign: ", userSignSelection);
    const userMarkSign = userSignSelection.toUpperCase();
    const otherUserMarkSign = userMarkSign === "X" ? "O" : "X";
    const userPlayerName = "YOU";
    const userPlayer = Player(userPlayerName, userMarkSign, "human");

    const otherPlayerName = "OTHER USER";
    let otherPlayerType;
    if (e.target === userAndMachineBtn) otherPlayerType = "machine";
    else otherPlayerType = "human";

    const otherPlayer = Player(
      otherPlayerName,
      otherUserMarkSign,
      otherPlayerType
    );
    console.log(userPlayer, otherPlayer);
    // append color, text and class for result display div
    userScoreDiv.classList.add(`${userMarkSign.toLowerCase()}`);
    userScoreDiv.appendChild(
      createElement(
        "p",
        `${userMarkSign}(${userPlayerName})`,
        `${userPlayerName}-name`
      )
    );
    userScoreDiv.appendChild(
      createElement("p", userPlayer.score, `${userPlayer.name}-score`)
    );

    otherUserScoreDiv.classList.add(`${otherUserMarkSign.toLowerCase()}`);
    const otherUserDisplayName =
      otherPlayerType === "human"
        ? `${otherUserMarkSign}( ${otherPlayerName})`
        : `${otherUserMarkSign}( CPU)`;

    otherUserScoreDiv.appendChild(
      createElement("p", otherUserDisplayName, `${otherPlayerName}-name`)
    );
    otherUserScoreDiv.appendChild(
      createElement("p", otherPlayer.score, `${otherPlayerName}-score`)
    );

    // hide starter section
    showGameScreen();

    //start game
    startGame(userPlayer, otherPlayer);
  };

  const machinePlay = (gameController) => {
    let { indices, markType } = gameController.otherPlayerPlay();
    updateScreen(indices, markType);

    return markType;
  };

  const startGame = (userPlayer, otherPlayer) => {
    gameController = GameController(userPlayer, otherPlayer);
    let activePlayerIdx = gameController.getActivePlayerIdx();
    console.log("active player idx: ", activePlayerIdx);
    updateTurn(gameController.getActivePlayerMark());
    let markType;
    // start case 1: user vs another user
    cells.forEach(
      (cell) =>
        (cell.onclick = (e) => {
          if (e.target.textContent !== "") return;
          const rowIdx = Number(e.target.dataset.row) - 1;
          const colIdx = Number(e.target.dataset.col) - 1;
          markType = gameController.getActivePlayerMark();
          console.log("user mark type ", markType);
          gameController.playerCheckMark(rowIdx, colIdx);
          updateScreen([rowIdx, colIdx], markType);

          if (otherPlayer.type === "machine" && !gameController.canGameEnd()) {
            setTimeout(() => {
              markType = machinePlay(gameController);
            }, 600);
          }

          if (gameController.hasWinner(markType)) {
            const winnerName = gameController.getWinnerName(markType);
            console.log(userPlayer, otherPlayer, winnerName);
            showScores(userPlayer, otherPlayer);
            showDialog(`${winnerName} wins!!!`);
          } else if (gameController.canGameEnd()) {
            showScores(userPlayer, otherPlayer, true);
            showDialog("TIE");
          }
          updateTurn(gameController.getActivePlayerMark());
        })
    );

    //start Case 2: user vs MACHINE
    if (activePlayerIdx === 1 && otherPlayer.type === "machine")
      machinePlay(gameController);
  };

  const showScores = (userPlayer, otherPlayer, tie = false) => {
    const userScoreP = document.getElementById(`${userPlayer.name}-score`);
    userScoreP.innerText = userPlayer.score;

    const otherScoreP = document.getElementById(`${otherPlayer.name}-score`);
    otherScoreP.innerText = otherPlayer.score;

    // if tie
    tie
      ? (tieScoreP.textContent = Number(tieScoreP.textContent) + 1)
      : tieScoreP.textContent;
  };

  const showDialog = (displayContent) => {
    const dialog = document.getElementById("dialog");
    const dialogHeader = document.getElementById("dialog-header");
    dialogHeader.innerText = displayContent;
    dialog.showModal();

    const restartBtn = document.getElementById("restart-btn");
    restartBtn.onclick = (e) => {
      console.log(e);
      dialog.close();
      resetGame();
      tieScoreP.innerText = 0;
      showHomeScreen();
    };

    const nextBtn = document.getElementById("next-round-btn");
    nextBtn.onclick = (e) => {
      console.log(e);
      resetGame();
      dialog.close();
    };
  };

  const resetGame = () => {
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

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.onclick = () => resetGame();
})(document);
