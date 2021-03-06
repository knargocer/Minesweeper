
import { AppBar, Typography, Avatar, Toolbar, Button} from '@material-ui/core';
import  {React, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles'
import * as actionType from '../../commons/actionTypes';
import decode from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className = {classes.brandContainer}>
        <Typography component = {Link} to = "/" className={classes.heading} variant="h2" align="center"> Minesweeper </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
        {user&& user.result.username?  (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} >{user?.result.username.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">Welcome {user?.result.username} !</Typography>
            <Button variant="contained" className ={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="secondary">Sign In</Button>
        )}
      </Toolbar>
        </AppBar>
    );
}

export default Navbar;
