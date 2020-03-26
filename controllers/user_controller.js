const User=require('../models/users');


module.exports.profile=function(req,res){

// to read cookies u need below two comands in index.js

// const cookieParser=require('cookie-parser');
// app.use(cookieParser());
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user)
        {
            if(err){
                console.log(err);
                return res.redirect('/users/sign-in');
            }

            if(user)
            {
                console.log("2");
                return  res.render('profile',{
                    title: "Profile Title",
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email
                });
            }else{
                console.log("3");
                return res.redirect('users/sign-in');
            }


        });


    }else{
        console.log("4");
        return res.redirect('/users/sign-in');
    }

}

module.exports.post=function(req,res){
    return res.end("<h1> Post page is up.</h1>");
}

module.exports.signIn=function(req,res){
    return res.render('user_signIn',{
        title: "SignIn Page"
    });
}

module.exports.signUp=function(req,res){
    return res.render('user_signUp',{
        title: "SignUp Page"
    });
}

module.exports.create=function(req,res){

    console.log("==========================================================================================1");
    console.log(req.body);
    console.log("==========================================================================================1");

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){

        if(err){
            console.log("Error in creating user in err");
            return;

        }

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user"+err);
                    return;
                }

                return res.redirect('/users/sign-in');
                
            });

        }else{
            return res.redirect('/users/sign-in');
        }

    });


}

module.exports.createSession=function(req,res){

    //if email doesnt exits
    User.findOne({email: req.body.email},function(err,user){

        if(err)
        {
            console.log(err);
            res.redirect('back');
        }

        if(!user)
        {
            console.log("User doesnt exit");
            res.redirect('back');
        }else{

            // check password matches or not
            if(user.password!=req.body.password)
            {
                console.log("Password doest matches");
                res.redirect('back');
            }else{
                // create seesion in cookies
                res.cookie("user_id",user.id);
                res.redirect('/users/profile');
            }
            
        }

    });

}
