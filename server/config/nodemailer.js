const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.USER,
        pass : process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})


module.exports = {
    transporter
}
