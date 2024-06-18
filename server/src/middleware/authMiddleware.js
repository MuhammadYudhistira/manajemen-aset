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
    req.user = jwtDecode;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return responseError(401, "Token sudah expired", res);
    } else {
      return responseError(401, error.message, res);
    }
  }
  next();
};

module.exports = { authMiddleware };
