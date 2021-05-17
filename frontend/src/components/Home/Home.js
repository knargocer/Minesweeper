import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import UsersTable from '../UsersTable/table';

const Home = () => {
  return (
    <Grow in>
      <Container>
        <Grid container justify="space-around" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={4}> 
              <UsersTable/>
           </Grid>
        </Grid> 
      </Container>
    </Grow>
  );
};

export default Home;
