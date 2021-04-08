const express = require('express');
const router = express.Router();

const { create, categoryById, read,update,remove,list} = require('../controllers/Category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/Auth');
const { userById } = require('../controllers/User');


router.post('/category/create/:id', requireSignin, isAuth, isAdmin, create);
router.get('/category/:categoryId',read);
router.put('/category/:categoryId/:id', requireSignin, isAuth, isAdmin,update);
router.delete('/category/:categoryId/:id', requireSignin, isAuth, isAdmin,remove);
router.get('/categories',list);


router.param('categoryId',categoryById);

router.param('id', userById);

module.exports = router;