// const Player = function (name, markType) {
//   let status = false; //false for inactive and true for active

//   return {
//     status,
//     updateStatus() {
//       this.status = !status;
//     },
//     markType,
//   };
// };
function Player(name, markType) {
  this.name = name;
  this.markType = markType;
  this.status = false;
  this.updateStatus = () => (this.status = !this.status);
}
const gameBoard = () => {
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

  const updateBoard = (row_index, col_index, value) => {
    board[row_index][col_index] = value;
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

  const getRandomEmptyCell = (emptyIndices) =>
    emptyIndices[Math.floor(Math.random() * emptyIndices.length())];

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

const gameController = (...players) => {
  // pick a random player to start the game
  let playerActiveIdx = Math.round(Math.random());
  let game = gameBoard();
  game.initializeBoard();
  // players[playerActiveIdx].updateStatus();

  const playerCheckMark = (rowIndex, colIndex) => {
    const currentPlayer = players[playerActiveIdx];
    game.updateBoard(rowIndex, colIndex, currentPlayer.markType);
    currentPlayer.updateStatus();
    game.printBoard();

    // switch to other player
    playerActiveIdx = playerActiveIdx === 1 ? 0 : 1;
    console.log("playerIdx", playerActiveIdx);
  };

  const getActivePlayerIdx = () => playerActiveIdx;
  return { playerCheckMark, getActivePlayerIdx };
};

(function (document) {
  const userAndMachineBtn = document.getElementById("user-vs-machine");
  const userAndUser = document.getElementById("user-vs-user");
  const signs = document.getElementsByName("user-sign-selection");
  let userSignSelection = "";
  let start_game = false;

  signs.forEach((sign) => {
    if (sign.checked) userSignSelection = sign.id;
  });

  signs.forEach(
    (sign) =>
      (sign.onclick = (e) => {
        userSignSelection = sign.id;
      })
  );

  userAndMachineBtn.onclick = () => {
    start_game = true;
    // userAndUser.disabled = !userAndUser.disabled;
  };

  userAndUser.onclick = () => {
    // userAndMachineBtn.disabled = !userAndMachineBtn.disabled;
    start_game = true;
  };

  const startGame = (e) => {
    console.log("user select sign: ", userSignSelection);
  };
})(document);
// const game = gameBoard();
// game.initializeBoard();
// game.printBoard();
// // by row
// game.updateBoard(1, 0, "X");
// game.updateBoard(1, 1, "X");
// game.updateBoard(1, 2, "X");
// console.log(game.countEmptyCell());
// game.printBoard();
// game.getEmptyCells();
// game.initializeBoard();
// check by col
// game.updateBoard(0, 1, "X");
// game.updateBoard(1, 1, "X");
// game.updateBoard(2, 1, "X");
//by diagnoal
// game.updateBoard(0, 0, "X");
// game.updateBoard(1, 1, "X");
// game.updateBoard(2, 2, "X");

// game.updateBoard(0, 2, "X");
// game.updateBoard(1, 1, "X");
// game.updateBoard(2, 0, "X");
// game.printBoard();
// console.log(game.checkBoard("X"));

// let playerOne = new Player("user", "X");
// let playerTwo = new Player("machine", "O");
// let game_controller = gameController(playerOne, playerTwo);
// game_controller.playerCheckMark(1, 1);
// console.log("playerIdx", game_controller.getActivePlayerIdx());
