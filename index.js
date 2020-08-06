// npm install express-sessions for passport
// npm install connect-mongo  for storing session in mongodb

const express=require('express');

const cookieParser = require('cookie-parser');

const app=express();

const port =8000;

// set up of express-ejs-layout and should be declared above the app.use(routes).
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const bodyParser=require('body-parser');

const db=require('./config/mongoose');

//used to create session using passport
const session=require('express-session');
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo')(session);

//for node-saas-middleware
const sassMidleware = require('node-sass-middleware');

app.use(sassMidleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'exteded',
    prefix: '/css'

}));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.json());

app.use(express.static('./assets'));




//extract styles and script from the subpages into the layout. 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine.
app.set('view engine','ejs');
app.set('views','./views');

// all app.use(passport,session) should declared before app.use('/',require('./routes/index'));
app.use(session({
    name: 'codeial',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // mongoStrore is used to store session in mongodb
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        if(err){
            console.log(err || "connect-mongodb setup is ok");
        }
    }
    )

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticationUser);

app.use('/',require('./routes/index'));




app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port no: ${port}`);

});