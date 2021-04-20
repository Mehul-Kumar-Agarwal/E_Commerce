import React,{useState} from 'react'
import Layout from '../core/Layout';
import {signup} from '../Auth/index';
import {Link} from 'react-router-dom';


const Signup=()=>{

    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });
    //we are destructing the values we get from the form here so that we can use them in program
    const {name, email,password,error,success}=values;

    const handleChange  = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };
 
 
    const clickSubmit=(event)=>{
        event.preventDefault();
         setValues({...values,error:false});
        //create a new user
        signup({name,email,password}) //since key value pair have same object we need to specify both of them
        //to show user the error if there exsists any error and if no error, then we clear the form fields so that new user can signup
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,name:'',email:'',password:'',error:'',success:true})
            }
        });
    };

    

    const SignupForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
   <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
    {error}
    </div>
    
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );


    return(
        <Layout
        title="SignUp Page"
        description="Sign Up to Node React E-Commerce App"
        className="container col-md-8 offset-md-2">
        {showSuccess()}   {/*  to show success */}
        {showError()}     {/*  to show Error if any in the inputs given */}
        {SignupForm()}
    </Layout>
    );
};

export default Signup;
