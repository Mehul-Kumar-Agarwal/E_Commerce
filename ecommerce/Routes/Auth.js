const express=require('express');
const router=express.Router();

const {signup,signin,signout,requireSignin}=require('../Controllers/Auth.js');
const {userSignUpValidator}=require('../Validator/index');


router.post('/signup',userSignUpValidator,signup); 
router.post('/signin',signin); 
router.get('/signout',signout); 



module.exports=router; 