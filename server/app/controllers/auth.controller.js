const db = require("../models");

const User = db.user;
const ConnectionLog = db.connectionLog;

exports.signup = async (req, res) => {
  try {
    const user = new User({ ...req.body });

    await user.save();

    res.status(201).json({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(401).json({ message: "Authentication failed." });

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) return res.status(401).json({ message: "Authentication failed." });

    const token = await user.generateToken();

    const log = new ConnectionLog({ user: user._id, logIn: true });
    await log.save();

    req.socket.emit("connection-log", await ConnectionLog.findById(log._id).populate('user', 'username'));

    req.session.token = token;

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
