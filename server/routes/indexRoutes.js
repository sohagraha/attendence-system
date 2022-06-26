const router = require('express').Router()
const authenticated = require('../middleware/authenticateMiddleware');
const authRoutes = require('./authRoutes')
const usersRoutes = require('./usersRoutes')

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticated, usersRoutes);

module.exports = router; 