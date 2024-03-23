const express = require("express")
const router = express.Router();
const passport = require('../config/passport-setup')
const { GoogleLoginSucess } = require('../controllers/googlesucess')


router.post("/login", );

router.post("/signup", );

router.get("/google" , passport.authenticate("google" , {scope : ["profile" , "email"]}))

router.get("/google/callback" , passport.authenticate("google",{
    successRedirect : `${process.env.CLIENT_URL}/home`,
    failureRedirect : `${process.env.CLIENT_URL }`
}))

router.get('/login/success', GoogleLoginSucess);




module.exports = router;