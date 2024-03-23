

async function GoogleLoginSucess (req, res){
    try {
        if (!req.user) {
            console.log("Not a validate user");
            res.status(403).json({ msg: "not a user" });
        } else {
            res.status(200).json(req.user);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    GoogleLoginSucess,
}