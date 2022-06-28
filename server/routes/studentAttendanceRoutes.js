const { getAttendance, getAttendanceStatus, getAttendanceById, getAllAttendance } = require('../controller/studentAttendanceController');

const router = require('express').Router();

router.get('/status', getAttendanceStatus)
router.get('/attendance-list', getAllAttendance)
router.get('/:id', getAttendanceById)
router.get('/', getAttendance)


module.exports = router;