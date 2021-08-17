  
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
     res.send(req.user);
    //res.redirect('/profile');
});









///////////////////////////////////// FACEBOOK //////////////////////////////////////////////////////////////////

//auth with facebook


router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

   //call back route for facebook
  router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    //res.redirect('/profile');
    res.send("You are welcome :)---- "+req.user.username)

   //res.send("welcome to your profile")

   });


/////////////////////////////////// INSTAGRAM  //////////////////////////////////////////////////


  //router.get('/instagram',passport.authenticate('instagram',{scope: ['profile']}))
//   router.get('/instagram', passport.authenticate('instagram', { scope: ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'] }));
  
//   router.get('/instagram/redirect',passport.authenticate('instagram'),(req, res) => {
//  res.send("welcome to callback uri for intagram")

//  });

module.exports = router;


