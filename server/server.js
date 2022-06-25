const express = require('express');
const app = express();
const connectDB = require('./db');
const authenticated = require('./middleware/authenticateMiddleware');
const routes = require('./routes/indexRoutes')

app.use(express.json());
app.use(routes);



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




