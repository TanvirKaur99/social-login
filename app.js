const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('https').globalAgent.options.rejectUnauthorized = false;

const cors=require('cors');

const app = express();

// app.use(cors());




//  app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Methods"," GET, POST, OPTIONS, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers"," Content-Type,Origin, Accept");
//   res.setHeader("Access-Control-Allow-Credentials",true)

//  })




// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(4000, () => {
    console.log('app now listening for requests on port 4000');
});
