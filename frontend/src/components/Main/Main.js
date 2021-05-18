import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import UsersTable from '../UsersTable/table';
import Gif from '../Flames.gif';
import Game from '../Game/Game'
import { Button } from "@material-ui/core";
import startGif from './startGif.gif';

const Main = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [difficulty, setDifficulty] = useState('')
  const [dashOpen,setDashOpen] = useState(false);
  const [buttonShow,setButtonShow] = useState(true);
  const [gifShow, setGifShow] = useState(true);
  const[open, setOpen] = useState(false);

  const handleClick = (e) => {
    setButtonShow(false)
    setGifShow(false)
    console.log(e.currentTarget.value)
    setDifficulty(e.currentTarget.value);
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
                 <Button variant='contained' color='secondary' value={'Easy'} onClick={handleClick} >Easy</Button>
                 <Button variant='contained' color='secondary' value={'Medium'} onClick={handleClick}>Medium</Button>
                 <Button variant='contained' color='secondary' value={'Hard'} onClick={handleClick} >Hard</Button>
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
