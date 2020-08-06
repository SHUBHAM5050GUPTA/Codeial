const Post = require("../models/posts");
const User = require("../models/users");

module.exports.home=function(req,res){

    // Post.find({},function(err,posts){
    //    // console.log(posts);
    //     return res.render('home',{
    //         title: "Codeial",
    //         posts: posts
    //     });
    // });

    /***********      use of populate funtion in mongodb   ********************/
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Codeial",
            posts: posts
        });
    });
    
}