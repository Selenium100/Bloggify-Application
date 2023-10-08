const JWT = require("jsonwebtoken");
const secret = "$superman@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret, {
    expiresIn: "10m",
  });
  const date = new Date();
  console.log(`\nToken Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`);
  // Printing JWT token
  console.log(token);
  return token;
}


function validateToken(token){
  const payload = JWT.verify(token,secret);
  return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}
