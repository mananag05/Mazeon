const UsersCollection = require("../models/UsersSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { pub } = require("../config/redis");
const jwt = require('jsonwebtoken')

async function signup(req, res) {
  // Check if required fields are present in req.body
  if (!req.body.Username || !req.body.Email || !req.body.Password) {
    return res
      .status(400)
      .json({ msg: "Username, Email, and Password are required" });
  }

  let user = await UsersCollection.findOne({ email: req.body.Email });

  if (user) {
    return res.status(400).json({ msg: "Account already exists" });
  } else {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Check if the provided email matches the Gmail format
    if (!gmailRegex.test(req.body.Email)) {
      return res.status(400).json({ msg: "Invalid Gmail address" });
    }

    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const token = crypto.randomBytes(20).toString("hex");
    user = new UsersCollection({
      displayName: req.body.Username,
      email: req.body.Email,
      password: hashedPassword,
      verified: false,
      verificationtoken: token,
    });

    await user.save();

    const VerificationLink = `${process.env.CLIENT_URL}/verify/mail/user?mail=${req.body.Email}&token=${token}`;

    let details = {
      from: process.env.USER,
      to: req.body.Email,
      subject: "Verify Your Email",
      html: `<p>Hello ${req.body.Username},</p><p>Thank you for signing up! Please click <a href="${VerificationLink}">here</a> to verify your email address.</p>`,
    };

    await pub.publish("SENDMAILS", JSON.stringify(details));

    return res.status(200).json({ msg: "Account Created Successfully" });
  }
}

async function verifyuser(req, res) {
  const { token, mail } = req.body;

  const user = await UsersCollection.findOne({ email: mail });
  try {
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else if (user.verified == true){
      return res.status(200).json({ msg: "Account Verified" });
    }

    if (user.verificationtoken !== token) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    await UsersCollection.updateOne({ email : mail }, { $set: { verified: true } });
    return res.status(200).json({ msg: "Account Verified" });
  } catch (error){
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
  }
}


async function login (req,res){
  const user = await UsersCollection.findOne({email : req.body.Email})
  if(!user){
    return res.status(403).json({msg : "User Dosent Exists"})
  }
  const CheckPasword = await bcrypt.compare(req.body.Password , user.password)
  if(!CheckPasword || req.body.Password == "google-acc"){
     return res.status(403).json({msg : "Incorrect Password"})}
  else if (!user.verified){
     return res.status(403).json({msg : "Check Your Mail Inbox And Verify Your Account"})
  }

  const token = jwt.sign({
    displayName : user.displayName,
    email : user.email,
    image : user.image
  },
    process.env.TOKEN_SECRET)
    res.status(200).json({msg : "Succesfully Logged In" , AuthToken : token});

}

module.exports = {
  signup,
  verifyuser,
  login
};
