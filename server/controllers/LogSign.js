const UsersCollection = require('../models/UsersSchema');
const bcrypt = require("bcrypt")


async function signup(req, res) {
    // Check if required fields are present in req.body
    if (!req.body.Username || !req.body.Email || !req.body.Password) {
        return res.status(400).json({ msg: "Username, Email, and Password are required" });
    }

    console.log(req.body);

    let user = await UsersCollection.findOne({ email: req.body.Email });

    if (user) {
        return res.status(400).json({ msg: "Account already exists" });
    } else {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        user = new UsersCollection({
            displayName: req.body.Username,
            email: req.body.Email,
            password: hashedPassword,
            verified : false
        });

        await user.save();
        return res.status(200).json({ msg: "Account Created Successfully" });
    }
}

module.exports = {
    signup
};
