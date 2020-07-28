const GoogleStrategy=require('passport-google-oauth20').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const LinkedInStrategy=require('passport-linkedin-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const User=require('../models/User');

module.exports=(passport)=>{
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callback:"http://localhost:3000/auth/google/dashboard"
    },
    (accessToken, refreshToken, profile, cb)=> {
        User.findOrCreate({ googleId: profile.id,
                            name:profile.name,
                            avatar:profile.photo[0],
                            email:profile.email
           
        }, (err, user)=> {
          return cb(err, user);
        });
      }
    ));
    
    
    passport.use(new FacebookStrategy({
        clientID:process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
        callback:"http://localhost:3000/auth/facebook/dashboard"
    },
    (accessToken, refreshToken, profile, cb)=> {
        User.findOrCreate({ facebookId: profile.id,
                            name:profile.name,
                            avatar:profile.photo[0],
                            email:profile.email
        },  (err, user)=> {
          return cb(err, user);
        });
      }
    ));
    
    passport.use(new LinkedInStrategy({
        clientID:process.env.LINKEDIN_CLIENT_ID,
        clientSecret:process.env.LINKEDIN_CLIENT_SECRET,
        callback:"http://localhost:3000/auth/linkedin/dashboard"
    },
    (accessToken, refreshToken, profile, cb)=> {
        User.findOrCreate({ linkedinId: profile.id,
                           name:profile.name,
                           avatar:profile.photo[0],
                            email:profile.email
                          
        },  (err, user)=> {
          return cb(err, user);
        });
      }
    ));
    //4th strategy
    passport.use(new LocalStrategy({usernamefield:'email'},(email,password,done)=>{
      User.findOne({email:email})
      async (user)=>{
       try {if(!user){
         return done(nul,false,{message:'that email is not registered'});

       }
       //Match password
       bcrypt.compare(password,user.password,(err,isMatch)=>{
         if(err) throw err;
         if(isMatch){
           return done(null,user)
         }else{
           return done(null,false,{message:'Invalid credentials'})
         }

         
       })
         
       } catch (err) {
         console.log(err)
       }
      }
     
    }))
     
    
  
     //serialize and deserialize  
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}