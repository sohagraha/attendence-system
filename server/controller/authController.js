const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerService, loginService } = require('../service/authService');

const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerService(name, email, password);
        await user.save();
        res.status(201).json({
            msg: 'User created', user
        });
    }
    catch (err) {
        next(err);
    }
};
const loginController = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        const token = await loginService({ email, password });

        res.status(200).json({
            msg: 'User logged in', token
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = { registerController, loginController };