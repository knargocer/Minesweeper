import React, { useState, useEffect } from "react";
import createBoard from "./util/createboard";
import { shown } from "./util/show";
import Timer from "./Timer";
import Cell from "./Cell";
import { Container, Grid, Typography } from '@material-ui/core';
import Modal from "./Modal";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {makeGame,getGames} from '../../actions/game';

export default function Game(difficulty) {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      padding :theme.spacing(1),
      minWidth: 120,
      border: "1px solid purple",
      borderRadius: "5%",
      backgroundColor: 'white',
    },
    
  }));

  // const games = useSelector((state)=>state.games);
  // console.log(games);
  const classes = useStyles();
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [mineCount,setMineCount]=useState(0);
  const [flaggedCount, setflaggedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newTime, setTime] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [data, setData] = useState(difficulty);
  const [gameWon,setGameWon] = useState(false);
  const [gameData,setGameData] = useState({player_username:user.username, difficulty:difficulty, score:newTime})
  const[open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history  = useHistory();

  
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
      if(gameOver||gameWon){
        dispatch(makeGame(gameData))
        // const gameData = {'player_username': {JSON.parse(localStorage.getItem('profile')}, 'difficulty': data  }
        // dispatch(playGame(gameData,history ))
      }
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

  const handleChange = (e) =>{
    setData(e.target.value);
    generateBoard()
  }
  const refreshPage= ()=> {
    window.location.reload(false);
  }



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
    <Grid background = {'rgb(94,3,206)'}>
      <Timer gameOver={gameOver} sendTime={setTime} />
    <Typography align = 'right' color = "primary" variant="h5">The remaining Mine Count: {mineCount-flaggedCount}</Typography>
    </Grid>
    <Grid>
        <Grid>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={(e)=> setOpen(false)}
              onOpen={(e)=> setOpen(true)}
              value={difficulty}
              onChange={handleChange}
            >
              <MenuItem value={'Easy'}>Easy</MenuItem>
              <MenuItem value={'Medium'}>Medium</MenuItem>
              <MenuItem value={'Hard'}>Hard</MenuItem>
            </Select>
        </FormControl> 
        </Grid>
        <Grid>
        <Grid container align="center" justify= 'space-evenly'>
          <Button variant='contained' color='primary' onClick={() => setRestart()}>
            RESTART
          </Button>
      
          <Button variant='contained' color='primary'onClick={refreshPage}> Quit </Button>
          </Grid>
        </Grid>

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
