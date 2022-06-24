const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticated = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                msg: 'Please log in'
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'key');
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                msg: 'Please log in'
            });
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
}
module.exports = authenticated;