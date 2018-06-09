const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/key');
const cookieSession = require('cookie-session');
const passport = require('passport');

//Set up view engine  experess generator
app.set('view engine', 'ejs');

//Set Up cookies
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys : [keys.session.cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Set Up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//Connect to DataBase
mongoose.connect(keys.mongodb.dbURI, ()=>{
  console.log("MOngodb COnnected");
});

//Create Home Route
app.get('/', (req, res)=>{
  res.render("home", {user:req.user});
});

app.listen(3000, ()=>{
  console.log("Local Host on 3000");
});
