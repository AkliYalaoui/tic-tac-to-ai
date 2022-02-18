import { useState, useRef } from "react";
import "./board.css";
import { minmax, generate_successors, cost, leaf } from "./minmax";

const Board = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [mode, setMode] = useState("Min");
  const [depth, setDepth] = useState(2);
  const [ended, setEnded] = useState(false);

  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setMode("Min");
    setDepth(2);
    setEnded(false);
  };

  const updateBoard = (i) => {
    if (mode == "Min" && board[i] == "" && !ended) {
      const board_copy = [...board];
      board_copy[i] = "X";
      console.log(board_copy);
      setBoard((_) => board_copy);
      setMode("Max");

      if (leaf(board_copy)) {
        const c = cost(board_copy);

        if (c > 0) {
          alert("Oups,you lost");
        } else if (c == 0) {
          alert("It is a tie");
        } else {
          alert("Yay,you won");
        }
        setEnded(true);
        return;
      }

      const succ = generate_successors(board_copy, "Max");

      let k = 0;
      let j = 0;
      let max = -Infinity;

      while (k < succ.length) {
        let m = minmax(succ[k], "Min", depth);

        if (m > max) {
          max = m;
          j = k;
        }

        k++;
      }

      setBoard((_) => succ[j]);
      setMode("Min");

      if (leaf(succ[j])) {
        const c = cost(succ[j]);
        if (c > 0) {
          alert("Oups,you lost");
        } else if (c == 0) {
          alert("It is a tie");
        } else {
          alert("Yay,you won");
        }
        setEnded(true);
      }
    }
  };

  return (
    <main>
      <div className="params">
        <h3>Choose difficulty level</h3>
        <div>
          <button
            onClick={() => setDepth(0)}
            className={depth == 0 ? "selected" : ""}
          >
            Easy
          </button>
          <button
            onClick={() => setDepth(2)}
            className={depth == 2 ? "selected" : ""}
          >
            Normal
          </button>
          <button
            onClick={() => setDepth(4)}
            className={depth == 4 ? "selected" : ""}
          >
            Hard
          </button>
        </div>
      </div>
      <div className="board">
        {board.map((r, i) => {
          return (
            <button onClick={() => updateBoard(i)} key={i}>
              {r}
            </button>
          );
        })}
      </div>
      <button className="restart" onClick={restart}>
        Restart
      </button>
    </main>
  );
};

export default Board;
