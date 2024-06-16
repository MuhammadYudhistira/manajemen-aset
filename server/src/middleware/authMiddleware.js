const jwt = require("jsonwebtoken");
const { responseError } = require("../response/responseError");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return responseError(401, "Unauthorized", res);
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.userData = jwtDecode;
  } catch (error) {
    return responseError(401, "Unauthorized", res);
  }
  next();
};

module.exports = { authMiddleware };
