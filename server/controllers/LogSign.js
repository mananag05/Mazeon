const UsersCollection = require("../models/UsersSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { pub } = require("../config/redis")

async function signup(req, res) {
  // Check if required fields are present in req.body
  if (!req.body.Username || !req.body.Email || !req.body.Password) {
    return res
      .status(400)
      .json({ msg: "Username, Email, and Password are required" });
  }

  console.log(req.body);

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
    const expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + 12 * 60 * 60 * 1000); // Adding 12 hours in milliseconds
    const tokenExpiry = expiryTime.toISOString();
    user = new UsersCollection({
      displayName: req.body.Username,
      email: req.body.Email,
      password: hashedPassword,
      verified: false,
      verificationtoken: token,
      tokenexpiry: tokenExpiry,
    });

    await user.save();

    const VerificationLink = `${process.env.CLIENT_URL}/verify/mail/user?mail=${req.body.Email}&token=${token}`;

    let details = {
        from : process.env.USER,
        to : req.body.Email,
        subject : "Verify Your Email",
        html : `<p>Hello ${req.body.Username},</p><p>Thank you for signing up! Please click <a href="${VerificationLink}">here</a> to verify your email address.</p>`
    }

    await pub.publish("SENDMAILS" , JSON.stringify(details))

    return res.status(200).json({ msg: "Account Created Successfully" });
  }
}

module.exports = {
  signup,
};

const SendEmail = async (Email, EmailType) => {



    if(EmailType === 'VERIFY'){

    }
};


