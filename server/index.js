const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
require("dotenv").config();
const ConnectMongoAtlas = require("./config/connection")
ConnectMongoAtlas(process.env.MONGO_CONNECTION_URI)
const session = require("express-session")
const passport = require('./config/passport-setup')
app.use(bodyParser.json())

app.use(
    cors({
        origin : "http://localhost:3000",
        methods : "GET,POST,PUT,DELETE",
        credentials : true,
        
    }))


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

const AuthRoutes = require('./routes/authorisation');
app.use('/auth', AuthRoutes)


app.get("/logout", (req,res,next) => {
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect(process.env.CLIENT_URL)
    }) 
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App Listening On http:/localhost:${PORT}`)
})