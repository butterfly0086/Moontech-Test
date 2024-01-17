const db = require("../models");

const User = db.user;

exports.all = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json();
    }

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
