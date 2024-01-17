const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByName = await User.findOne({ username: req.body.username });
    
    if (userByName) return res.status(400).send({ message: "Failed! Username is already in use!" });

    const userByEmail = await User.findOne({ email: req.body.email });

    if (userByEmail) return res.status(400).send({ message: "Failed! Email is already in use!" });

    next();
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
