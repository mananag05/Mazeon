var jwt = require('jsonwebtoken');


module.exports = {
    auth : (req , res , next ) => {
        const Authheader = req.headers.authorization;
        const decoded_token = jwt.decode(Authheader, process.env.TOKEN_SECRET)
        if(decoded_token != null){
            if (!req.body) {
                req.body = {}; // Initialize req.body if it's undefined
            }
            req.body.email = decoded_token.email;
            req.body.displayName = decoded_token.displayName;
            req.body.image = decoded_token.image;
            next();
        } else{
            res.status(401).json({msg : 'Access Denied'})
        }
    }
}