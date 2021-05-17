import {React} from 'react';
import Navbar from './components/Navbar/Navbar';
import Home  from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {Container} from '@material-ui/core';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const App = () => {
    return (

        <BrowserRouter>
        <Container maxWidth = 'lg'>
        <Navbar/>
        </Container>
        <Switch>
            <Route path = "/" exact component = {Home}/>
            <Route path = "/auth" exact component = {Auth}/>
        </Switch>
        </BrowserRouter>
       
    );
}

export default App;
