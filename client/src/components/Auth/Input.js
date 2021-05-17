import React from 'react';
import { TextField, Grid } from '@material-ui/core';

const Input = ({ name, handleChange, label, autoFocus, type, sm }) => (
  <Grid item xs={12} sm={sm}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
  </Grid>
);
export default Input;