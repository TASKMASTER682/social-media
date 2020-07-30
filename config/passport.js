const GoogleStrategy=require('passport-google-oauth20').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;



const mongoose=require('mongoose');

const User=require('../models/User');

module.exports=(passport)=>{

   passport.use(new FacebookStrategy({
  clientID:process.env.FACEBOOK_CLIENT_ID,
  clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL:'/auth/facebook/dashboard'
},
async (accessToken,refreshToken,profile,done)=>{
  console.log([profile])
  const newUser={
    facebookId:profile.id,
    name:profile.displayname,
    avatar:profile.photos[0].value,
    email:profile.email[0]
  }

try {
  let user=await User.findOne({facebookId:profile.id})
  if(user){
    done(null,user)
  }else{
    user=await User.create(newUser);
    done(null,user)
  }
} catch (err) {
  console.log(err)
}

}
)),
 
  passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/dashboard'
  },
  

  

  async (accessToken,refreshToken,profile,done)=>{
    const newUser={
      googleId:profile.id,
      name:profile.displayname,
      avatar:profile.photos[0].value,
      email:profile.email
    }
  try {
    
  let user=await User.findOne({googleId:profile.id})
    if(user){
      done(null,user)
    }else{
      user=await User.create(newUser);
      done(null,user)
    }
  } catch (err) {
    console.log(err)
  }
  }
  
  )),



//serialize deserialize
passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user)
  })
})

} //start

   
 
    
 
