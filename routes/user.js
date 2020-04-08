const express=require('express');

const router=express.Router();

const passport=require('passport');

const userController=require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);

//for posts
router.get('/post',userController.post);

router .get('/sign-in',userController.signIn);

router .get('/sign-up',userController.signUp);

router.post('/create',userController.create);

router.post('/create',userController.create);


// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local'
), userController.createSession);

router.get('/sign-out',userController.destroySession);

module.exports = router;