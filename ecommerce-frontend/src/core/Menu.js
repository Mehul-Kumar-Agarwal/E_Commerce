import React from 'react';
import {Link, withRouter} from 'react-router-dom';
//link is like a regular link tag, withrouter is used to access props history

const isActive=(history,path)=>{
    if(history.location.pathname===path){
        return {color:"#ff9990"};
    }else{
        return {color:"#ffffff"};
    }
};


const Menu=({history})=>{
    return(
        <div>
                <ul className="nav nav-tabs bg-dark"> 
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">SignUp</Link>
                    </li>
                </ul>
        </div>
    );
};

export default withRouter(Menu);