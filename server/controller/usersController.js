const User = require('../models/User');
const { singleUser, getAllUsers } = require('../service/userService');
const { registerService } = require('../service/authService');
const error = require('../utils/error');

const getSingleUserController = async (req, res) => {
    try {
        const user = await singleUser('_id', req.params.userId);
        if (!user) {
            throw error('User not found', 404);
        }
        else {
            res.status(201).json({
                msg: 'User Found', user
            });
        }
    }
    catch (err) {
        throw error('User not found', 404);
    }
}
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(201).json({
            msg: 'Users Found', users
        });
    }
    catch (err) {
        throw error('Users not found', 404);
    }
}

const postSingleUserController = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body;
    try {
        const user = await registerService(name, email, password, roles, accountStatus);
        return res.status(201).json(user);
    } catch (e) {
        next(e);
    }
};

const deleteSingleUserController = async (req, res, next) => {
    try {
        const user = await singleUser('_id', req.params.userId);
        if (!user) {
            throw error('User not found or Already Deleted', 404);
        }
        else {
            await user.remove();
            res.status(201).json({
                msg: 'User Deleted', user
            });
        }
    }
    catch (err) {
        next(err)
    }
}

const patchSingleUserController = async (req, res) => {
    try {
        const user = await singleUser('_id', req.params.userId);
        if (user) {
            const { name, email, password, roles, accountStatus } = req.body;
            user.name = name ?? user.name;
            user.email = email ?? user.email;
            user.password = password ?? user.password;
            user.roles = roles ?? user.roles;
            user.accountStatus = accountStatus ?? user.accountStatus;
            await user.save();
            return res.status(201).json({
                msg: 'User updated', user
            });
        }
        else {
            throw error('User not found', 404);
        }
    }
    catch (e) {
        next(e)
    }
}


module.exports = {
    getSingleUserController,
    getAllUsersController,
    patchSingleUserController,
    postSingleUserController,
    deleteSingleUserController
}