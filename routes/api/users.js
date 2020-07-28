const express=require("express");
const router=express.Router();
const { check, validationResult } = require('express-validator');

const User = require("../../models/User");

//@route Post api/users
//register user
//access public
router.get('/',(req,res)=>{
    res.render('/')
});
router.get('/register',(req,res)=>{
    
})
 

module.exports=router; 

    