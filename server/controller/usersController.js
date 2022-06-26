const User = require('../models/User');
const { singleUser, getAllUsers } = require('../service/userService');
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

const patchSingleUserController = async (req, res) => {
    const user = await singleUser('_id', req.params.userId);
    if (user) {
        //update user 

    }
    else {
        throw error('User not found', 404);
    }
}


module.exports = {
    getSingleUserController,
    getAllUsersController,
    patchSingleUserController
}