const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config({});

function authenticate(req, res, next) {
  const token = extractTokenFromHeader(req.headers["authorization"]);

  if (!token) {
    return sendErrorResponse(res, 400, "Token Error");
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return sendUnauthorizedResponse(res, "Token authentication required");
    }

    req.user = user;
    next();
  });
}

module.exports = authenticate;
