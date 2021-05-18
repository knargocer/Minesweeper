import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import UsersTable from '../UsersTable/table';
import { CardMedia } from '@material-ui/core';
import Gif from '../Flames.gif';
import Board from '../Game/Board'
const Main = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <Grow in>
      <Container>
        {user?(<Grid container justify="space-around" alignItems="stretch" spacing={3} direction = "row">
              <Grid>
              <UsersTable/>
              </Grid>
              <Board />
    
        </Grid> ):<><Typography align = 'center' color = "secondary" variant="h3">Please Sign in or Sign Up To Start the Explosions!!!</Typography>
        <Grid align = 'center'><img src={Gif} alt="loading..." /></Grid></>
        }
     
      </Container>
    </Grow>
  );
};

export default Main;
