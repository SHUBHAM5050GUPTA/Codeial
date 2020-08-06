const express=require('express');

const router=express.Router();

console.log("Router file is loaded.");

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);

//directing towards user folder. so used middleware aftrewards.
router.use('/users',require('./user'));
router.use('/posts',require('./post'));

module.exports=router;