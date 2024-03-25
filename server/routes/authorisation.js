const express = require("express")
const router = express.Router();
const passport = require('../config/passport-setup')
const { GoogleLoginSucess } = require('../controllers/googlesucess')
const { GetUser } = require('../controllers/getuser')
const { auth } = require('../middlewares/checktokenvalidity')

router.post("/login", );

router.post("/signup", );

router.get("/google" , passport.authenticate("google" , {scope : ["profile" , "email"]}))

router.get("/google/callback" , passport.authenticate("google",{
    successRedirect : `${process.env.CLIENT_URL}/home`,
    failureRedirect : `${process.env.CLIENT_URL }`
}))

router.get('/login/success', GoogleLoginSucess);

router.post('/user', auth , GetUser);



module.exports = router;