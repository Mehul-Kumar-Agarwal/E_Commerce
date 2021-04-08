import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'; 
/*
//Browser Router is a component, wrap all the routes and will make props available to nested components
//Basically, we will be able to grab route parameters using this 
*/
import Signup from './User/Signup';
import Signin from './User/Signin';
import Home from './core/Home';

const Routes=()=>{
    return(
        <BrowserRouter>
            {/* Inside Switch we have all the routes */}
            <Switch>
            <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signup" exact component={Signup}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;