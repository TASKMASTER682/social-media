const mongoose=require("mongoose");
const findOrCreate=require('mongoose-findorcreate');
const passportLocalMongoose=require('passport-local-mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:true
    },
    avatar:{
        type:String,

    },
    date:{
        type:Date,
        default:Date.now
    },
    googleId:{
        type:String,
        required:true
    },
    facebookId:{
        type:String,
        required:true
    }

});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
module.exports=mongoose.model("User",UserSchema);