const { getEnableController, getDisableController, getOpenController } = require('../controller/adminAttendanceController');

const router = require('express').Router();

router.get('/enable', getEnableController)
router.get('/disable', getDisableController)
router.get('/open', getOpenController)


module.exports = router;