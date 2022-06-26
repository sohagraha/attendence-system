const User = require("../models/User");

const singleUser = (key, value) => {
    if (key === '_id') {
        return User.findById(value);
    }
    else {
        return User.findOne({ [key]: value });
    }
}

const createNewUser = (name, email, password) => {
    const user = new User({
        name: name,
        email: email,
        password: password
    });
    return user.save();
}

const getAllUsers = () => {
    return User.find();
}

module.exports = {
    singleUser,
    createNewUser,
    getAllUsers
}