import React, { useState, useEffect } from "react";
import createBoard from "./util/createboard";
import Cell from "./Cell";
import { shown } from "./util/show";
import Timer from "./Timer";
import Modal from "./Modal";
export default function Board() {
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newTime, setTime] = useState(0);

  const generateBoard = () => {
    const makeBoard = createBoard(9, 9,5 , setMineLocations);
    setNonMinesCount(100 - 20);
    setTime(0);
    setBoard(makeBoard.board);
    setMineLocations(makeBoard.mineLocation);
    setGameOver(false);
    setRestart(false);
  };
  useEffect(() => {
    
    generateBoard();
  }, [restart, setRestart]);



  const updateBoard = (x, y, e) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMinesCount;
    if (newBoardValues[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        if (
          !newBoardValues[mineLocations[i][0]][mineLocations[i][1]].shown
        ) {

        newBoardValues[mineLocations[i][0]][
            mineLocations[i][1]
          ].shown = true;
          setBoard(newBoardValues);
       }
      }
      setGameOver(true);
    } else {
   
      newBoardValues = shown(newBoardValues, x, y, newNonMinesCount);
      if (!newBoardValues) {
        return;
      }
      setBoard(newBoardValues.arr);
      setNonMinesCount(newBoardValues.newNonMinesCount);
    }
  };

  const flagCell = (x, y) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    newBoardValues[x][y].flagged = !newBoardValues[x][y].flagged;
    setBoard(newBoardValues);
  };

  return (
    
    <div
      style={{ boxShadow: "0 4px 3px rgba(0,0,0,0.1)", position: "relative" }}
    >
      {gameOver && <Modal reset={setRestart} completeTime={newTime} />}
      <div
      style={{
        background: "rgb(94,3,206)",
        padding: "10px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Timer gameOver={gameOver} sendTime={setTime} />
    </div>
      {board.map((row, i) => {
        return (
          <div style={{ display: "flex" }} key={i}>
            {row.map((singleCell, index) => {
              console.log(singleCell)
              console.log(index);
              return (
                <Cell
                  key={index}
                  data={singleCell}
                  updateBoard={updateBoard}
                  flagCell={flagCell}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
