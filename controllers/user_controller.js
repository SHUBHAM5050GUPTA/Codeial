const User=require('../models/users');


module.exports.profile=function(req,res){
    return res.render('profile',{
        title: "Profile Title"
    });
}

module.exports.post=function(req,res){
    return res.end("<h1> Post page is up.</h1>");
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signIn',{
        title: "SignIn Page"
    });
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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

module.exports.createSession= function(req,res){
    console.log("In create session");
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    console.log("in LogOut");
    req.logout();
    return res.redirect('/');
}
