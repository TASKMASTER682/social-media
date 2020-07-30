const express=require("express");
const router=express.Router();
const passport=require('passport');




router.get('/login',(req,res)=>{
    res.render('login')
})
//second strategy
router.get('/facebook',(req,res)=>{
    passport.authenticate('facebook',{scope:['profile']})
});
router.get('/facebook/dashboard',passport.authenticate('facebook',{failureRedirect:'/login'}),
            (req,res)=>res.redirect('/dashboard')
);

//google
router.get('/google',passport.authenticate('google',{scope:['profile']}))
   
router.get('/google/dashboard',passport.authenticate('google',{failureRedirect:'/login'}),
            (req,res)=>res.redirect('home')
);


//third strategy


//logout route
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})

module.exports=router;