const { getAttendance, getAttendanceStatus, getAttendanceById } = require('../controller/studentAttendanceController');

const router = require('express').Router();

router.get('/status', getAttendanceStatus)
router.get('/', getAttendance)
router.get('/:id', getAttendanceById)


module.exports = router;