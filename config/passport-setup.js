const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const key = require('./key');
const User = require('../models/user-model');

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
  done(null, user);
});
});

passport.use(
  new GoogleStratergy({
    //options for google stratergy
    callbackURL:'/auth/google/redirect',
    clientID : key.google.clientID,
    clientSecret : key.google.clientSecret,
  }, (accessToken, refreshToken, profile, done)=>{
    //passport callback function
    User.findOne({googleId : profile.id}).then((currentUser)=>{
      if(currentUser){
        //already have a usern
        console.log("Already a user " + currentUser);
        done(null, currentUser);
      }
      else{
        new User({
          username : profile.displayName,
          googleId : profile.id
        }).save().then((newUser)=>{
          console.log("The Profile of User is " + newUser);
          done(null, newUser);
        });
      }
    })
  })
)
