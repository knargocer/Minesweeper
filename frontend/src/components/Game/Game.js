import React, { useState, useEffect } from "react";
import createBoard from "./util/createboard";
import { shown } from "./util/show";
import Timer from "./Timer";
import Modal from "./Modal";
import Cell from "./Cell";


export default function Game(difficulty) {
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [flaggedCount, setflaggedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newTime, setTime] = useState(0);
  const [data, setData] = useState(difficulty);
  const [gameWon,setGameWon] = useState(false);
  
  const generateBoard = () => {
    let x ;
    let y ;
    let mineCount;
    if(data.prop === 'Easy'){
        x = 9;
        y = 9;
        mineCount = 10;
    }
    if(data.prop === 'Medium'){
      x = 16;
      y = 16;
      mineCount = 40;
    }
    if(data.prop === 'Hard'){
      x = 30;
      y = 36;
      mineCount = 99;
   }
    const makeBoard = createBoard(x, y,mineCount , setMineLocations);
    setNonMinesCount(x*y - mineCount);
    setTime(0);
    setBoard(makeBoard.board);
    setMineLocations(makeBoard.mineLocation);
    setGameOver(false);
    setGameWon(false);
    setRestart(false);

  };
  useEffect(() => {
    setData(difficulty.prop.prop)
    generateBoard();
  }, [restart, setRestart]);



  const updateBoard = (x, y, e) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMinesCount;
    if(newNonMinesCount === 0){
      setGameWon(true)
    }
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
    console.log(newBoardValues[x][y].flagged)
    setBoard(newBoardValues);
  };

  return (
    <div
      style={{ boxShadow: "0 4px 3px rgba(0,0,0,0.1)", position: "relative" }}
    >
      {(gameOver || gameWon) && <Modal reset={setRestart} completeTime={newTime} />}
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
              return (
                <Cell key={index} data={singleCell}  updateBoard={updateBoard} flagCell={flagCell}  />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
