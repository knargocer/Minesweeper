import React, { useState } from 'react'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import {Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import Input from './Input';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signIn,signUp} from '../../actions/auth';



const Auth = ()=> {
    const classes = useStyles();
    const [signUpFlag, setSignUpFlag] = useState(false);
    const [formIn, setFormIn] = useState({username:'', firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }); 

    const dispatch = useDispatch();
    const history  = useHistory();



    const handleSubmit = (e) => {
      e.preventDefault();
      if(signUpFlag){
          dispatch(signUp(formIn,history ))
      }
      else{
        dispatch(signIn(formIn,history ))
      }


    };
    const handleChange = (e) => {
      setFormIn({...formIn, [e.target.name]: e.target.value});
    };


    const handleSwitch = (e) => {setSignUpFlag((flag) => !flag);};

    return (
        <Container component = 'main' maxwidth = 'xs'>
            <Paper className = {classes.paper} elevation = {3}>
            <Avatar className = {classes.avatar}>
                <LockOutLinedIcon/>
            </Avatar>
            <Typography variant ='h5'>{signUpFlag?'Sign Up':'Sign In'}</Typography>
            
            <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { 
            signUpFlag?  (
            <>
            
            <Input name='username' label='Username' handleChange={handleChange} sm={12}  required = {true}/>
            <Input name='firstName' label='First Name' handleChange={handleChange} sm = {6}  required = {true}/>
            <Input name='lastName' label='Last Name' handleChange={handleChange} sm = {6}  required = {true} />
            <Input name='email' label='Email Address' handleChange={handleChange} type='email'  required = {true}/>
            <Input name='password' label='Password' handleChange={handleChange} type= 'password' required = {true} />
            </>
            ):(
                <>
            <Input name='username' label='Username' handleChange={handleChange} required = {false} />
            <Typography variant="h7">or</Typography>
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' required = {false} />
            <Input name='password' label='Password' handleChange={handleChange} type='password' />
            </>
            )}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            { signUpFlag ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={handleSwitch} color='secondary' >
                { signUpFlag ? 'Already have an account? Sign in' : 'Want to join us? Sign Up' }
              </Button>
            </Grid>
          </Grid>
        </form>
            </Paper>
        </Container>
    )

}
export default Auth;

