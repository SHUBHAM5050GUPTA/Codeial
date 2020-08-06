const Post=require('../models/posts');

module.exports.create=function(req,res){

    console.log("==========================================================================================1");
    console.log(req.body);
    console.log("==========================================================================================1");

    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating post');
            return;
        }
        return res.redirect('back');

    });
        
}