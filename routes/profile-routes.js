const router = require('express').Router();

// const authCheck = (req, res, next) => {
//     if(!req.user){
    //if user is not loged in
//         res.redirect('/auth/login');
//     } else {
//         next();
//     }
// };

// router.get('/', authCheck, (req, res) => {
//     res.render('profile', { user: req.user });
// });

router.get('/',(req,res)=>{res.send('You are logged in,this is your profile-')})

module.exports = router;
