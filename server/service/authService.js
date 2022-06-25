const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const { singleUser, createNewUser } = require('./userService');

const registerService = async (name, email, password) => {
    if (!name || !email || !password) {
        const err = new Error('Please enter all fields');
        err.status = 400;
        throw err;
    }
    if (!email.includes('@')) {
        const err = new Error('Please enter a valid email');
        err.status = 400;
        throw err;
    }
    // Check if user exists
    let user = await singleUser('email', email);
    // If user exists, throw error
    if (user) {
        const err = new Error('User already exists');
        err.status = 400;
        throw err;
    }
    // Hash password
    password = await bcrypt.hash(password, 10);


    // Create new user
    user = await createNewUser(name, email, password);

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
        const err = error('User does not exist', 400);
        throw err;
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error('Incorrect password');
        err.status = 400;
        throw err;
    }
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus
    }
    // Create token
    const token = jwt.sign(payload, 'key', { expiresIn: '1h' });
    return token;
}

module.exports = {
    registerService,
    loginService
}