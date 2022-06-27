const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const { singleUser, createNewUser } = require('./userService');

const registerService = async (name, email, password, roles, accountStatus) => {
    if (!name || !email || !password) {
        throw error('Please enter all fields', 400);
    }
    if (!email.includes('@')) {
        throw error('Please enter a valid email', 400);
    }
    // Check if user exists
    let user = await singleUser('email', email);
    // If user exists, throw error
    if (user) {
        throw error('User already exists', 400);
    }
    // Hash password
    password = await bcrypt.hash(password, 10);


    // Create new user
    user = await createNewUser(name, email, password, roles, accountStatus);

    // Return user
    return user;
}

const loginService = async ({ email, password }) => {
    //check blank fields
    if (!email || !password) {
        throw error('Please enter all fields', 400);
    }
    // Check if user exists
    let user = await singleUser('email', email);
    if (!user) {
        throw error('User does not exist', 400);
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw error('Incorrect password', 400);
    }
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus
    }
    // Create token
    const token = jwt.sign(payload, 'key', { expiresIn: '8h' });
    return token;
}

module.exports = {
    registerService,
    loginService
}