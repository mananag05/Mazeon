const jwt = require('jsonwebtoken')

async function GoogleLoginSucess (req, res){
    try {
        if (!req.user){
            res.status(403).json({ msg: "Invalid" });
        } else {
            const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
            const token = jwt.sign({
                displayName : req.user.displayName,
                email : req.user.email,
                image : req.user.image
            },
                process.env.TOKEN_SECRET)
            res.status(200).json({msg : "Succesfully Logged In" , AuthToken : token});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    GoogleLoginSucess,
}