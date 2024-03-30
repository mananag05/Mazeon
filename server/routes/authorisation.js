const express = require("express")
const router = express.Router();
const passport = require('../config/passport-setup')
const { GoogleLoginSucess } = require('../controllers/googlesucess')
const { GetUser } = require('../controllers/getuser')
const { auth } = require('../middlewares/checktokenvalidity')
const { signup , verifyuser , login} = require('../controllers/LogSign')



router.post("/login", login );

router.post("/signup", signup );

router.get("/google" , passport.authenticate("google" , {scope : ["profile" , "email"]}))

router.get("/google/callback" , passport.authenticate("google",{
    successRedirect : `${process.env.CLIENT_URL}/home`,
    failureRedirect : `${process.env.CLIENT_URL }`
}))

router.get('/login/success', GoogleLoginSucess);

router.post('/user', auth , GetUser);

router.post('/verify', verifyuser )

module.exports = router;

