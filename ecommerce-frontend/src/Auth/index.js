import { API } from '../config';

//this method will be used to create a new user by sending data to backend
export const signup=(user)=>{
    // console.log(name,email,password);
    console.log(JSON.stringify(user))
    return fetch(`${API}/signup`,{
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


//this method will be used to sigin a user by sending data to backend
export const signin=(user)=>{
    // console.log(name,email,password);
    console.log(JSON.stringify(user))
    return fetch(`${API}/signin`,{
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




//to store the user in the local storage
export const authenticate=(data,next)=>{
    if(typeof window!='undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))//first item is key and second is what we want to store
        next() //here we can redirecting users to some page, clearing state values, ....
    }   
};



export const signout=(next)=>{
    if(typeof window!='undefined'){
        localStorage.removeItem('jwt')//first item is key and second is what we want to store
        next(); //here we can redirecting users to some page, clearing state values, ....
        return fetch(`${API}/signout`,{
            method:"GET",
        })
        .then(response=>{
            console.log('signout');
        })
        .catch(err=>console.log(err))
    }   
};


//a method that will help hide the links like signout when user is signed in
export const isAuthenticated=()=>{
    if(typeof window == 'undefined'){
            return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else{
        return false;   
    }
}// this method will return false if we don't have an item named jwt in the local storage