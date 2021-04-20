import React,{Fragment} from 'react';
//fragment can be used to wrap multiple items like lists
import {Link, withRouter} from 'react-router-dom';
//link is like a regular link tag, withrouter is used to access props history
import {signout,isAuthenticated} from '../Auth/index'


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

                    {/* We have a standard logged in user if role ==0 so to check that we do the below */}
                    {isAuthenticated() && isAuthenticated().user.role===0 && (
                        <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                    )}


                    {/* We have an Admin in user if role ==1 so to check that we do the below */}
                    {isAuthenticated() && isAuthenticated().user.role===1 && (
                        <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                    )}

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">SignIn</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">SignUp</Link>
                            </li>
                        </Fragment>
                    )}


                    {isAuthenticated() && (
                        <div>
                            <li className="nav-item">
                                <span className="nav-link" style={{cursor:'pointer',color:'#fff'}} onClick={()=>signout(()=>{
                                    history.push('/');
                                })}>SignOut</span>
                            </li> 
                    </div>
                    )}

                </ul>
        </div>
    );
};

export default withRouter(Menu);