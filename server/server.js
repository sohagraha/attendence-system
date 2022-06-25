const express = require('express');
const app = express();
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/authenticateMiddleware');
const authenticated = require('./middleware/authenticateMiddleware');

app.use(express.json());


app.post('/register', async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                msg: 'Please enter all fields'
            });
        }
        if (!email.includes('@')) {
            return res.status(400).json({
                msg: 'Please enter a valid email'
            });
        }
        // Check if user exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                msg: 'user already exists'
            });
        }

        password = await bcrypt.hash(password, 10);


        user = new User({
            name: name,
            email: email,
            password: password
        });
        await user.save();
        res.status(201).json({
            msg: 'User created', user
        });
    }
    catch (err) {
        next(err);
    }
})

app.post('/login', async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Please enter all fields'
            });
        }
        // Check if user exists
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                msg: 'User does not exist'
            });
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }
        // Create token
        const token = jwt.sign({ id: user._id }, 'key', { expiresIn: '1h' });
        res.status(200).json({
            msg: 'User logged in', token
        });
    }
    catch (err) {
        next(err);
    }
})

app.get('/private', authenticated, async (req, res, next) => {
    return res.status(200).json({
        msg: 'This is a private route'
    });

});

//public route
app.get('/public', async (req, res, next) => {
    try {
        return res.status(200).json({
            msg: 'This is a public route'
        });
    }
    catch (err) {
        next(err);
    }
})

// main site route
app.get('/', (_req, res) => {
    const obj = {
        name: 'sohag',
        email: "sohagrahabd@gmail.com"
    };
    res.json(obj);
})

app.use((err, _req, res, _next) => {
    res.status(500).json({
        msg: err.message
    });
})
// Connect to database
connectDB('mongodb://localhost:27017/attendance')
    .then(() => {
        console.log('Connected to DB');
        app.listen(4000, () => {
            console.log("Listening....");
        });
    })
    .catch(err => {
        console.log('Error: ', err);
    });




