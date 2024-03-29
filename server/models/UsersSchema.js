const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true, // displayName is required
    },
    email: {
      type: String,
      unique: true,
      required: true, // email is required
    },
    image: { 
        type: String,
        default : ""
    },
    password: {
      type: String,
      required: true,
      default: "google-acc",
    },
    verified : {
        type : Boolean,
        default : false
    },
    verificationtoken : {
        type : String,
    },
  },
  { timestamps: true }
);

const UsersCollection = mongoose.model("users", UserSchema);

module.exports = UsersCollection;
