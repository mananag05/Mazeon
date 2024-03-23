// passport-setup.js
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const UsersCollection = require('../models/UsersSchema');

passport.use(
    new OAuth2Strategy({
        clientID : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET,
        callbackURL : "/auth/google/callback",
        scope : ["profile" , "email"]
    },
    async(acessToken , refreshToken , profile, done) => {
    
        try{
            let user = await UsersCollection.findOne({email : profile.email});
            let UserData = {};
            if(!user){
                user = new UsersCollection({
                    displayName : profile.displayName,
                    email : profile.emails[0].value,
                    image : profile.photos[0].value
                })

                UserData = {
                    googleid : profile.id,
                    displayName : profile.displayName,
                    email : profile.emails[0].value,
                    image : profile.photos[0].value
                }

                await user.save();
            }

            return done(null,UserData)

        } catch (error) {
            return done(error, null)
        }
    }
    )
)


passport.serializeUser((UserData,done) => {
    done(null,UserData)
})
passport.deserializeUser((UserData,done) => {
    done(null,UserData)
})

module.exports = passport;
