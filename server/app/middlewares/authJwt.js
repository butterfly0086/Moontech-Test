const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  try {
    const token = req.session.token;
    const decoded = jwt.verify(token, config.secret);

    req.user = decoded.userId;

    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized!" });
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
