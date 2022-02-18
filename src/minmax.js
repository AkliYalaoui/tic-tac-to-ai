export function minmax(board, mode, depth) {
  if (leaf(board)) return cost(board);

  if (depth == 0) return estimate(board);

  let val;

  if (mode == "Max") {
    val = -1000;
    generate_successors(board, mode).forEach((b) => {
      val = Math.max(val, minmax(b, "Min", depth - 1));
    });
  } else if (mode == "Min") {
    val = 1000;
    generate_successors(board, mode).forEach((b) => {
      val = Math.min(val, minmax(b, "Max", depth - 1));
    });
  }

  return val;
}

export function leaf(board) {
  let i = 0;
  while (i < 9) {
    if (
      board[i] == board[i + 1] &&
      board[i + 1] == board[i + 2] &&
      board[i + 2] != ""
    ) {
      return true;
    }
    i += 3;
  }

  i = 0;

  while (i < 3) {
    if (
      board[i] == board[i + 3] &&
      board[i + 3] == board[i + 6] &&
      board[i + 6] != ""
    ) {
      return true;
    }
    i++;
  }

  let diagp = [board[2], board[4], board[6]];
  let diagN = [board[0], board[4], board[8]];

  if (diagp.every((a) => a == "O") || diagp.every((a) => a == "X")) return true;

  if (diagN.every((a) => a == "O") || diagN.every((a) => a == "X")) return true;

  return board.every((b) => b != "");
}

export function cost(board) {
  // ROW 1
  if ([board[0], board[1], board[2]].every((a) => a == "O")) return 100;
  if ([board[0], board[1], board[2]].every((a) => a == "X")) return -100;

  // ROW 2
  if ([board[3], board[4], board[5]].every((a) => a == "O")) return 100;
  if ([board[3], board[4], board[5]].every((a) => a == "X")) return -100;

  // ROW 3
  if ([board[6], board[7], board[8]].every((a) => a == "O")) return 100;
  if ([board[6], board[7], board[8]].every((a) => a == "X")) return -100;

  // COL 1
  if ([board[0], board[3], board[6]].every((a) => a == "O")) return 100;
  if ([board[0], board[3], board[6]].every((a) => a == "X")) return -100;

  // COL 2
  if ([board[1], board[4], board[7]].every((a) => a == "O")) return 100;
  if ([board[1], board[4], board[7]].every((a) => a == "X")) return -100;

  // COL 3
  if ([board[2], board[5], board[8]].every((a) => a == "O")) return 100;
  if ([board[2], board[5], board[8]].every((a) => a == "X")) return -100;

  //diagP
  if ([board[0], board[4], board[8]].every((a) => a == "O")) return 100;
  if ([board[0], board[4], board[8]].every((a) => a == "X")) return -100;

  // diagN
  if ([board[2], board[4], board[6]].every((a) => a == "O")) return 100;
  if ([board[2], board[4], board[6]].every((a) => a == "X")) return -100;

  return 0;
}
function esimateROW(board, i) {
  let score = 0;

  if ([board[i], board[i + 1]].every((a) => a == "O") && board[i + 2] == "")
    score += 10;
  if ([board[i], board[i + 1]].every((a) => a == "X") && board[i + 2] == "")
    score += -10;

  if ([board[i + 1], board[i + 2]].every((a) => a == "O") && board[i] == "")
    score += 10;
  if ([board[i + 1], board[i + 2]].every((a) => a == "X") && board[i] == "")
    score += -10;

  if ([board[i], board[i + 2]].every((a) => a == "O") && board[i + 1] == "")
    score += 10;
  if ([board[i], board[i + 2]].every((a) => a == "X") && board[i + 1] == "")
    score += -10;

  if ([board[i], board[i + 1]].every((a) => a == "") && board[i + 2] == "O")
    score += 1;
  if ([board[i], board[i + 1]].every((a) => a == "") && board[i + 2] == "X")
    score += -1;

  if ([board[i + 1], board[i + 2]].every((a) => a == "") && board[i] == "O")
    score += 1;
  if ([board[i + 1], board[i + 2]].every((a) => a == "") && board[i] == "X")
    score += -1;

  if ([board[i], board[i + 2]].every((a) => a == "") && board[i + 1] == "O")
    score += 1;
  if ([board[i], board[i + 2]].every((a) => a == "") && board[i + 1] == "X")
    score += -1;

  return score;
}
function esimateCol(board, i) {
  let score = 0;

  if ([board[i], board[i + 3]].every((a) => a == "O") && board[i + 6] == "")
    score += 10;
  if ([board[i], board[i + 3]].every((a) => a == "X") && board[i + 6] == "")
    score += -10;

  if ([board[i + 3], board[i + 6]].every((a) => a == "O") && board[i] == "")
    score += 10;
  if ([board[i + 3], board[i + 6]].every((a) => a == "X") && board[i] == "")
    score += -10;

  if ([board[i], board[i + 6]].every((a) => a == "O") && board[i + 3] == "")
    score += 10;
  if ([board[i], board[i + 6]].every((a) => a == "X") && board[i + 3] == "")
    score += -10;

  if ([board[i], board[i + 3]].every((a) => a == "") && board[i + 6] == "O")
    score += 1;
  if ([board[i], board[i + 3]].every((a) => a == "") && board[i + 6] == "X")
    score += -1;

  if ([board[i + 3], board[i + 6]].every((a) => a == "") && board[i] == "O")
    score += 1;
  if ([board[i + 3], board[i + 6]].every((a) => a == "") && board[i] == "X")
    score += -1;

  if ([board[i], board[i + 6]].every((a) => a == "") && board[i + 3] == "O")
    score += 1;
  if ([board[i], board[i + 6]].every((a) => a == "") && board[i + 3] == "X")
    score += -1;

  return score;
}
function estimate(board) {
  let score = 0;

  // ROW 1
  score += esimateROW(board, 0);

  // ROW 2
  score += esimateROW(board, 1);

  // ROW 3
  score += esimateROW(board, 3);

  // COL 1
  score += esimateCol(board, 0);

  // COL 2
  score += esimateCol(board, 1);

  // COL 3
  score += esimateCol(board, 3);

  // Diagp
  if ([board[0], board[4]].every((a) => a == "O") && board[8] == "")
    score += 10;
  if ([board[0], board[4]].every((a) => a == "X") && board[8] == "")
    score += -10;

  if ([board[8], board[4]].every((a) => a == "O") && board[0] == "")
    score += 10;
  if ([board[8], board[4]].every((a) => a == "X") && board[0] == "")
    score += -10;

  if ([board[0], board[8]].every((a) => a == "O") && board[4] == "")
    score += 10;
  if ([board[0], board[8]].every((a) => a == "X") && board[4] == "")
    score += -10;

  if ([board[0], board[4]].every((a) => a == "") && board[8] == "O") score += 1;
  if ([board[0], board[4]].every((a) => a == "") && board[8] == "X")
    score += -1;

  if ([board[8], board[4]].every((a) => a == "") && board[0] == "O") score += 1;
  if ([board[8], board[4]].every((a) => a == "") && board[0] == "X")
    score += -1;

  if ([board[0], board[8]].every((a) => a == "") && board[4] == "O") score += 1;
  if ([board[0], board[8]].every((a) => a == "") && board[4] == "X")
    score += -1;

  // DiagN

  if ([board[2], board[4]].every((a) => a == "O") && board[6] == "")
    score += 10;
  if ([board[2], board[4]].every((a) => a == "X") && board[6] == "")
    score += -10;

  if ([board[6], board[4]].every((a) => a == "O") && board[2] == "")
    score += 10;
  if ([board[6], board[4]].every((a) => a == "X") && board[2] == "")
    score += -10;

  if ([board[2], board[6]].every((a) => a == "O") && board[4] == "")
    score += 10;
  if ([board[2], board[6]].every((a) => a == "X") && board[4] == "")
    score += -10;

  if ([board[2], board[4]].every((a) => a == "") && board[6] == "O") score += 1;
  if ([board[2], board[4]].every((a) => a == "") && board[6] == "X")
    score += -1;

  if ([board[6], board[4]].every((a) => a == "") && board[2] == "O") score += 1;
  if ([board[6], board[4]].every((a) => a == "") && board[2] == "X")
    score += -1;

  if ([board[2], board[6]].every((a) => a == "") && board[4] == "O") score += 1;
  if ([board[2], board[6]].every((a) => a == "") && board[4] == "X")
    score += -1;

  return score;
}

export function generate_successors(board, mode) {
  let i = 0;
  const bb = [...board];
  const succ = [];

  while (i < 9) {
    if (bb[i] == "") {
      bb[i] = mode == "Min" ? "X" : "O";
      succ.push(Array(...bb));
      bb[i] = "";
    }

    i++;
  }

  return succ;
}
