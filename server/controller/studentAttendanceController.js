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
        const studentAttendance = await AdminAttendance.findById(id);
        if (!studentAttendance) {
            throw new Error('Student attendance not found');
        }

        const studentAttendances = await StudentAttendance.findOne({ adminAttendance: id });
        if (!studentAttendances) {
            const newAttendance = await new StudentAttendance({
                user: req.user._id,
                adminAttendance: id
            });
            await newAttendance.save();
            res.status(201).json({
                message: 'Student attendance Submitted', newAttendance
            });
            res.status(200).json({
                message: 'Student attendance found', studentAttendance
            });
        }
        else {
            throw new Error('Student attendance already submitted');
        }
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

const getAllAttendance = async (req, res, next) => {
    try {
        const studentAttendances = await StudentAttendance.find({});
        if (!studentAttendances) {
            throw new Error('No student attendances found', 404);
        }
        res.status(200).json({
            message: 'Student attendances found', studentAttendances
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAttendance,
    getAttendanceStatus,
    getAttendanceById,
    getAllAttendance
}