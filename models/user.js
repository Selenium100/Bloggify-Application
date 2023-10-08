const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const {createTokenForUser} =  require('../services/authentication')

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhotoUrl: {
      type: String,
      default: "/images/profile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashedPassword;
    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
const user = await this.findOne({email});
if(!user) throw new Error('User not found')

const salt = user.salt;
const hashPassword = user.password;

const userProvidedHash = createHmac("sha256", salt)
.update(password)
.digest("hex");

if(userProvidedHash === hashPassword){
  const token = createTokenForUser(user);
  return token;
}else{
  throw new Error ('Invalid Password');
}
})

const User = mongoose.model("users", userSchema);

module.exports = User;
