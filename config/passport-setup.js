const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Strategy=require('passport-facebook');
var Instagram = require('passport-instagram');
const InstagramStrategy = Instagram.Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


////////////////////////////////////////GOOGLE/////////////////////////////////////////////////////////////

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'http://localhost:4000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {

        console.log("passport call back function");
        console.log(profile);
        console.log("google profile id is:" +profile.id)

        // new User({
        //     slId:profile.id,
        //     username:profile.displayName,
        //     provider:profile.provider
            
        // }).save().then((newUser)=>{
        //     console.log('created new google user: ', newUser);
        // })

      //  check if user already exists in our own db
         User.findOne({slId:profile.id}).then((currentUser) => {
             if(currentUser){
                 // already have this user
                 console.log('user is>>>>>>>>>>>>>>>>>>>>>>: ', currentUser);
                 //done(null, currentUser);
             } else {
                 // if not, create user in our db
                 new User({
                        slId:profile.id,
                        username:profile.displayName,
                        provider:profile.provider
                   // thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                   // done(null, newUser);
                });
            }
        });
    })
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////// FACEBOOK ///////////////////////////////////////////////////////

passport.use(new Strategy({
    clientID:keys.facebook.clientID,
    clientSecret:keys.facebook.clientSecret,
    callbackURL:'https://819839981a1e.ngrok.io/auth/facebook/redirect',
    Proxy:false,
   
},(accessToken,refreshToken,profile,done)=>{

    console.log("passport callback function for facebook")
    console.log(profile);
       //  check if user already exists in our own db
       User.findOne({slId:profile.id}).then((currentUser) => {
        if(currentUser){
            // already have this user
            console.log('user is>>>>>>>>>>>>>>>>>>>>>>: ', currentUser);
            //done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                   slId:profile.id,
                   username:profile.displayName,
                   provider:profile.provider
              // thumbnail: profile._json.image.url
           }).save().then((newUser) => {
               console.log('created new user: ', newUser);
              // done(null, newUser);
           });
       }
   });

}));


/////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////INRAGRAM ///////////////////////////////////////

passport.use(new InstagramStrategy({
    clientID: keys.instagram.clientID,
    clientSecret: keys.instagram.clientSecret,
    callbackURL: "https://0b1539bdf22f.ngrok.io/instagram/redirect",
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken,refreshToken,profile)
    console.log(profile)
  }))