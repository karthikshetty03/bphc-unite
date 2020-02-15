
const passport = require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require('mongoose')
const User = mongoose.model('users')

passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/redirect'
         },
        (accessToken, refreshToken, profile, done)=>{
           User.findOne({googleId:profile.id})
           .then((userExists)=>{
                if(userExists){
                  console.log('Current user is :'+profile.id)
                } else{
                    new User({googleId:profile.id}).save().then((newUser)=>{
                      console.log('new user created'+newUser)
                      
                    })
                }
           })
            
         }
     )
  );