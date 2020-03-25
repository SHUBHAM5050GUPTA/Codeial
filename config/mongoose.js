const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db',{ useNewUrlParser: true });

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to db"));

db.once('open',function(){
    console.log("Connected to the database");
});

module.exports = db;
