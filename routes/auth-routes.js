const router = require('express').Router();
const passport = require('passport');


require('../models/usermodel');

const mongoose=require('mongoose');
var regData=mongoose.model('register');


//auth register
// router.get('/register',(req,res)=>{
//     var reg=new regData({
//         firstname:req.body.firstname,
//         lastname:req.body.lastname,
//         email:req.body.email,
//         password:req.body.password,
//         contact:req.body.contact,

//     });
//     reg.save().then((docs)=>{
//         return res.status(200).json({
//             message:"new user register successfully",
//             success:true,
//             data:docs

//         })
//     }).catch((err)=>{
//         return res.status(401).json({
//             message:"error in adding",
//             success:false,
//             error:err.message
//         })
//     })
// })

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
