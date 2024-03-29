const { Redis } = require("ioredis");
const { transporter } = require("../config/nodemailer");

const pub = new Redis({
  host: process.env.REDISHOST,
  port: 25896,
  username: "default",
  password: process.env.REDISPASS,
});

const sub = new Redis({
  host: process.env.REDISHOST,
  port: 25896,
  username: "default",
  password: process.env.REDISPASS,
});

sub.subscribe("SENDMAILS");

sub.on("message", (channel, message) => {
  if (channel === "SENDMAILS"){
    ParsedDetails = JSON.parse(message)
    transporter.sendMail(ParsedDetails, (err) => {
      if (err) {
        console.log("An Err Occured :", err);
      }
    });
  }
});

module.exports = {
  sub,
  pub,
};
