var jwt = require('jsonwebtoken');


module.exports = {
    auth : (req , res , next ) => {
        const Authheader = req.headers.authorization;
        const decoded_token = jwt.decode(Authheader, process.env.TOKEN_SECRET)
        if(decoded_token != null){
            req.body.SendersMail = decoded_token.Mail;
            next();
        } else{
            res.status(401).json({msg : 'Access Denied'})
        }
    }
}