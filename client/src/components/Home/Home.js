import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';

const Home = () => {
//   const [currentId, setCurrentId] = useState(0);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-around" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={4}> 
              
           </Grid>
          <Grid item xs={12} sm={4}>
          
          </Grid>
        </Grid> 
      </Container>
    </Grow>
  );
};

export default Home;
