const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
require("dotenv").config();
const ConnectMongoAtlas = require("./connection")
ConnectMongoAtlas(process.env.MONGO_CONNECTION_URI)
const session = require("express-session")
const passport = require("passport")
const OAuth2Strategy = require("passport-google-oauth2").Strategy


app.use(
    cors({
        origin : "http://localhost:3000",
        methods : "GET,POST,PUT,DELETE",
        credentials : true,
        
    })
)

// start google auth

const UsersCollection = require("./models/UsersSchema")

app.use(session({
    secret : "my-secret",
    resave : false,
    saveUninitialized : true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      },

}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID : process.env.CLIENT_ID,
        clientSecret : process.env.CELINT_SECRET,
        callbackURL : "/auth/google/callback",
        scope : ["profile" , "email"]
    },
    async(acessToken , refreshToken , profile, done) => {
        try{
            let user = await UsersCollection.findOne({googleId : profile.id});
            if(!user){
                user = new UsersCollection({
                    googleId : profile.id,
                    displayName : profile.displayName,
                    email : profile.emails[0].value,
                    image : profile.photos[0].value
                })

                await user.save();

            }

            return done(null,user)

        } catch (error) {
            return done(error, null)
        }
    }
    )
)


passport.serializeUser((user,done) => {
    done(null,user)
})
passport.deserializeUser((user,done) => {
    done(null,user)
})

app.get("/auth/google" , passport.authenticate("google" , {scope : ["profile" , "email"]}))

app.get("/auth/google/callback" , passport.authenticate("google",{
    successRedirect : `${process.env.CLIENT_URL}/offline`,
    failureRedirect : `${process.env.CLIENT_URL }`
}))

app.get('/login/success', async (req,res) => {
    console.log("req" , req.user)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Listening On http:/localhost:${PORT}`)
})