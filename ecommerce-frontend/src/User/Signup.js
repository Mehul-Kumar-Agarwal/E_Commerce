import React,{useState} from 'react'
import Layout from '../core/Layout';
import {API} from '../config';




const Signup=()=>{

    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });
    const {name, email,password}=values;

    const handleChange  = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };
 
 //this method will be used to create a new user by sending data to backend
    const signup=(user)=>{
        // console.log(name,email,password);
        console.log(JSON.stringify(user))
        fetch(`${API}/signup`,{
            //we can write whatever we are gonna send to backend here
            method:"POST",
            mode:'cors',
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Method": "*",
            },
            body:JSON.stringify(user)
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>{
            console.log(err)
        });//to send data to back end we can use fetch and it is available in the browsers by default
    };

    const clickSubmit=(event)=>{
        event.preventDefault();
        //create a new user
        signup({name,email,password}); //since key value pair have same object we need to specify both of them
    };

    

    const SignupForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control"></input>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );
    return(
        <Layout
        title="SignUp Page"
        description="Sign Up to Node React E-Commerce App"
        className="container col-md-8 offset-md-2">
        {SignupForm()}
        {JSON.stringify(values)}
    </Layout>
    );
};

export default Signup;























  
    // const signup=(user)=>{
    //     // console.log(name,email,password);

    //     fetch(`${API}/signup`,{
    //         //we can write whatever we are gonna send to backend here
    //         method:"POST",
    //         mode:'cors',
    //         headers:{
    //             "Content-Type": "application/json",
                
    //             //  "Access-Control-Allow-Origin": "*",
    //             // "Access-Control-Request-Method": "*",
    //              Accept: "application/json",
    //             // "Access-Control-Allow-Headers":"*", 
    //             // "Origin, X-Requested-With, Content-Type, Accept"
                
    //         },
    //         body:JSON.stringify(user)
    //     })
    //     .then(response=>{
    //         return response.json()
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     });
    // };