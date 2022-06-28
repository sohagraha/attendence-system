const StudentAttendance = require('../models/StudentAttendance');
const AdminAttendance = require('../models/AdminAttendance');

const getAttendance = async (req, res, next) => {
    try {
        const openAttendance = await AdminAttendance.findOne({
            status: 'open'
        });
        if (!openAttendance) {
            return res.status(404).json({
                message: 'No open attendance found'
            });
        }
        res.status(200).json({
            message: 'Open attendance found', openAttendance
        });

    }
    catch (err) {
        next(err);
    }
}
const getAttendanceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const studentAttendance = await StudentAttendance.findById(id);
        if (!studentAttendance) {
            throw new Error('Student attendance not found');
        }
        res.status(200).json({
            message: 'Student attendance found', studentAttendance
        });
    }
    catch (err) {
        next(err);
    }
}
const getAttendanceStatus = async (req, res, next) => {
    try {
        const openAttendance = await AdminAttendance.findOne({
            status: 'open'
        });
        if (!openAttendance) {
            return res.status(404).json({
                message: 'No open attendance found'
            });
        }
        res.status(200).json({
            message: 'Open attendance found', openAttendance
        });

    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAttendance,
    getAttendanceStatus,
    getAttendanceById
}