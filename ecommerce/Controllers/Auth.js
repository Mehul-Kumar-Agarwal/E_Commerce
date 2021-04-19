const User=require('../Models/User')
const {errorHandler}=require('../Helpers/dbErrorHandler')
const jwt=require('jsonwebtoken') //to generate signed token
const expressJwt=require('express-jwt') //authorisation checking


exports.signup=(req,res)=>{
    // console.log("reqbody",req.body);
    const user=new User(req.body) //body-parser is used here
    //console.log(" New user entry "+ user)
    user.save((err,user)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err:errorHandler(err)
            });
        }
        user.salt=undefined;
        user.hashed_password=undefined;
        res.json({
            user
        });
    });
};


exports.signin=(req,res)=>{
    // find user based on email
    const {email, password}=req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User with that email doesnt exsist, please sign up"
            });
        }
        //if user found, make sure email and password is found
        //create authenticate method is used model
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"Email and password does not match"
            })
        }
        //generate a signed token with user id and secrets
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
        //persist token as 't' in cookie wuth expiry date
        res.cookie('t',token,{expire:new Date()+9999});
        //return res with user and token to front end client
        const {_id,name,email,role}=user;

        return res.json({token,user:{_id,email,name,role}});
    });
};


exports.signout=(req,res)=>{
    //we need to clear cookie 
    res.clearCookie('t');
    res.json({
        message:"Signout Sucessfull"
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], //express-jwt requires algorithms
    userProperty: "auth",
  });


exports.isAuth= (req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!user){
        return res.status(403).json({
            error:"Access Denied"
        });
    }
    next();
};
exports.isAdmin= (req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Admin Resource!! Access cannot be granted"
      });
    }
    next();
};