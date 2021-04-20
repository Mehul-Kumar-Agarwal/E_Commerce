import React,{useState} from 'react'
import Layout from '../core/Layout';
import {signin,authenticate,isAuthenticated} from '../Auth/index';
import { Redirect} from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
        email: 'mehulkagarwal@gmail.com',
        password: 'mehul123',
        error: '',
        loading: false,
        redirectToReferrer:false,
    });

    const { email, password, error, loading, redirectToReferrer } = values; //this is local to signin as we are using useState here
    const {user}=isAuthenticated(); //we use isAuthenticated method

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false,loading:true });
        signin({ email, password })
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                //authenticate requires 2 parameters, 1st is data and 2nd is the function to tell what to do
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                    }); 
                }); 
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading</h2></div>)
    );

    const redirectUser=()=>{
        if(redirectToReferrer){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }
    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
