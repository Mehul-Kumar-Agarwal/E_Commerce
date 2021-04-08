const express=require('express');
const router=express.Router();


const {userById,read,update}=require('../Controllers/User.js');

const {requireSignin,isAdmin,isAuth}=require('../Controllers/Auth.js');
const {userSignUpValidator}=require('../Validator/index');

router.get('/sec/:id',requireSignin,isAdmin,isAuth,(req,res)=>{
    res.json({
        user:req.profile
    });
});

router.get('/user/:id',requireSignin,isAuth,read);
router.put('/user/:id',requireSignin,isAuth,update);

router.param('id',userById);//takes parameter and executes userById method and will make it available in request object



module.exports=router; 