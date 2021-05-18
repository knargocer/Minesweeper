import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import UsersTable from '../UsersTable/table';
import Gif from '../Flames.gif';
import Game from '../Game/Game'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from "@material-ui/core";
import startGif from './startGif.gif';

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding :theme.spacing(1),
    minWidth: 120,
    border: "1px solid purple",
    borderRadius: "5%",
    backgroundColor: 'white',
  },
  
}));

const Main = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [difficulty, setDifficulty] = useState('')
  const [dashOpen,setDashOpen] = useState(false);
  const [buttonShow,setButtonShow] = useState(true);
  const [gifShow, setGifShow] = useState(true);
  const[open, setOpen] = useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setButtonShow(false)
    setGifShow(false)
    setDifficulty(event.target.value);
  };

  
  const handleDash=()=>{
    setGifShow(!gifShow)
    setDashOpen(!dashOpen)

  }

  return (
    <Grow in>
      <Container>
        {user?
        
        
        //When the user is signed in 

        (<Grid container justify="space-around" alignItems="stretch" spacing={3} direction = "row">
            {
                buttonShow?<Grid><Button variant='contained' color='secondary'onClick={handleDash}>DashBoard</Button></Grid>:<></>}
                
                { gifShow?<img src={startGif} alt="loading..."/>:<></>}
                {
                //is dashboard is open  
                dashOpen && !difficulty ?<UsersTable/>:
                (<>

               {(difficulty?<>
              
               <Game prop = {difficulty}/>
                </>:
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

               </Grid>)
               }</>)

               }
        </Grid> 
        
        
        )

        //When there is no user this page is rendered for as the start page
        :<><Typography align = 'center' color = "secondary" variant="h3">Please Sign in or Sign Up To Start the Explosions!!!</Typography>
        <Grid align = 'center'><img src={Gif} alt="loading..."/></Grid></>
        }
      </Container>
    </Grow>
  );
};

export default Main;
