import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Grid, Typography } from '@material-ui/core'; 



export default function Modal({ reset, completeTime }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);

  const refreshPage= ()=> {
    window.location.reload(false);
  }

  return (
    <div
      style={{
        opacity: render ? 1 : 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "rgba(0,0,0,0.3)",
      }}
    >
    <Grid container align="center" justify= 'space-evenly'>
      <Button variant='contained' color='secondary' onClick={() => reset()}>
        RESTART
      </Button>
   
      <Button variant='contained' color='secondary'onClick={refreshPage}> Quit </Button>
      </Grid>
    </div>
  );
}
