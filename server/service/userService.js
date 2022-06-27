const User = require("../models/User");

const singleUser = (key, value) => {
    if (key === '_id') {
        return User.findById(value);
    }
    else {
        return User.findOne({ [key]: value });
    }
}

const createNewUser = (name, email, password, roles, accountStatus) => {
    const user = new User({
        name: name,
        email: email,
        password: password,
        roles: roles,
        accountStatus: accountStatus
    });
    return user.save();
}

const getAllUsers = () => {
    return User.find();
}

const deleteUser = (id) => {

}

module.exports = {
    singleUser,
    createNewUser,
    getAllUsers,
    deleteUser
}