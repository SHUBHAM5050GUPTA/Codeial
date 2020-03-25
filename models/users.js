const mongooose=require('mongoose');

const userSchema=mongooose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }},
    {
        timestamps: true
});

const User=mongooose.model('User',userSchema);

module.exports=User;