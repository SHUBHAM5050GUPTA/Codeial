const express=require('express');
const app=express();

const port =8000;

// set up of express-ejs-layout and should be declared above the app.use(routes).
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const bodyParser=require('body-parser');
// to read cookies
const cookieParser=require('cookie-parser');


const db=require('./config/mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
// to read cookies
app.use(cookieParser());

app.use(express.static('./assets'));

app.use('/',require('./routes/index'));

//extract styles and script from the subpages into the layout. 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine.
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port no: ${port}`);

});