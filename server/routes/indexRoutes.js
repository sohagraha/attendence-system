const router = require('express').Router()
const authenticated = require('../middleware/authenticateMiddleware');
const authRoutes = require('./authRoutes')
const usersRoutes = require('./usersRoutes')
const adminAttendanceRoutes = require('./adminAttendanceRoutes')
const studentAttendanceRoutes = require('./studentAttendanceRoutes')

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticated, usersRoutes);
router.use('/api/v1/admin/attendance', authenticated, adminAttendanceRoutes);
router.use('/api/v1/student/attendance', authenticated, studentAttendanceRoutes);

module.exports = router; 