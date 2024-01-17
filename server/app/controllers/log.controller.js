const db = require("../models");

const Log = db.connectionLog;

exports.all = async (req, res) => {
    try {
        const logs = await Log.find().populate('user', 'username');

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
