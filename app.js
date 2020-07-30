const dotenv=require('dotenv');
const ejs=require('ejs')
const express=require("express");
const connectDB=require('./config/db');
const passport=require("passport");
const mongoose=require('mongoose');
const authRoutes=require('./routes/api/auth')

const session=require('express-session')
 
const app =express();

app.set('view engine','ejs');
//loading config
dotenv.config({path:'./config/config.env'});
//using passport route
require('./config/passport')(passport);
//usedb
connectDB();

//init middleware
app.use(express.json({extended:false}));
//express session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    
}))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>res.render('home'));
//defining routes


app.use('/auth',authRoutes)


const PORT=process.env.PORT||5000

app.listen(PORT,()=> console.log(`server running at ${process.env.NODE_ENV} mode on port ${PORT}`)
);