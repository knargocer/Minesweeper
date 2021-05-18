import {React} from 'react';
import Navbar from './components/Navbar/Navbar';
import Main  from './components/Main/Main';
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
            <Route path = "/" exact component = {Main}/>
            <Route path = "/auth" exact component = {Auth}/>
        </Switch>
        </BrowserRouter>
       
    );
}

export default App;
