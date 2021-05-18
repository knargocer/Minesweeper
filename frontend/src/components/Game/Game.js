import React, { useState, useEffect } from "react";
import createBoard from "./util/createboard";
import { shown } from "./util/show";
import Timer from "./Timer";
import Cell from "./Cell";
import { Container, Grid, Typography } from '@material-ui/core';
import Modal from "./Modal";

export default function Game(difficulty) {
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [mineCount,setMineCount]=useState(0);
  const [flaggedCount, setflaggedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newTime, setTime] = useState(0);
  const [data, setData] = useState(difficulty);
  const [gameWon,setGameWon] = useState(false);
  
  const generateBoard = () => {
    let x ;
    let y ;
    let mines;
    let check = data.prop?data.prop:data; 
    if(check === 'Easy'){
        x = 9;
        y = 9;
        mines = 10;
    }
    if(check === 'Medium'){
      x = 16;
      y = 16;
      mines = 40;
    }
    if(check === 'Hard'){
      x = 30;
      y = 36;
      mines = 99;
   }
   setMineCount(mines)
    const makeBoard = createBoard(x, y,mines , setMineLocations);
    setNonMinesCount(x*y - mineCount);
    setTime(0);
    setBoard(makeBoard.board);
    setMineLocations(makeBoard.mineLocation);
    setGameOver(false);
    setGameWon(false);
    setRestart(false);

  };
  useEffect(() => {
    setData(difficulty.prop)
    generateBoard();
  }, [restart, setRestart]);



  const updateBoard = (x, y, e) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMinesCount;
    if(newNonMinesCount === 1){
      setGameWon(true)
      alert("YOU WINNNN!!!!!")
      window.location.reload(false);
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
      alert('game over jana <3!')
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
    if(newBoardValues[x][y].flagged){
        const count =  flaggedCount+1;
        setflaggedCount(count)
    }
    else{
      const count =  flaggedCount- 1;
      setflaggedCount(count)
    }
    setBoard(newBoardValues);
  };


  return (
    <div
      style={{ boxShadow: "0 4px 3px rgba(0,0,0,0.1)", position: "relative" }}
    >
      {(gameOver || gameWon)?<>
     {/*if we need to show some modal  */}
        <div
        style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div id="gameOverImage"></div>
      <Modal reset={setRestart} completeTime={newTime} />
    </div>
      </>:<></>}
      <Container >
      {/* <div
      style={{
        background: "rgb(94,3,206)",
        padding: "10px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    > */}
    <Grid background = {'rgb(94,3,206)'}>
      <Timer gameOver={gameOver} sendTime={setTime} />
    {/* </div> */}
    <Typography align = 'right' color = "primary" variant="h5">The remaining Mine Count: {mineCount-flaggedCount}</Typography>
    </Grid>
    <Grid>
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
    </Grid>
    </Container>
    </div>
  );
}
