const express=require('express');
const router=express.Router();

const {create,productById,read,remove,update,list,listRelated,listCategories,listBySearch,photo}=require('../Controllers/Product');
const {requireSignin,isAdmin,isAuth}=require('../Controllers/Auth');
const {userById}=require('../Controllers/User');


router.get('/product/:productId',read);
router.post('/product/create/:id',requireSignin,isAdmin,isAdmin,create);
router.delete('/product/:productId/:id',requireSignin,isAdmin,isAdmin,remove);
router.put('/product/:productId/:id',requireSignin,isAdmin,isAdmin,update);

//return the products
router.get('/products',list);
router.get('/products/related/:productId',listRelated);

//return categories based on product
router.get('/products/categories',listCategories);
//search based products
router.post("/products/by/search", listBySearch);

router.get("/products/photo/:productId",photo)

router.param('id',userById);
router.param('productId',productById);

module.exports = router

