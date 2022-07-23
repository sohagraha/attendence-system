const AdminAttendance = require('../models/AdminAttendance')
const { addMinutes, isAfter } = require('date-fns')
const express = require('express');

const getEnableController = async (req, res, next) => {
    try {
        const openAttendance = await AdminAttendance.findOne({ status: 'open' });
        if (openAttendance) {
            throw new Error('Attendance is already running', 404);
        }
        const attendance = new AdminAttendance({
        });
        await attendance.save();
        await res.status(200).json({
            msg: 'Attendance enable', attendance
        });
    }
    catch (err) {
        next(err)
    }
}
const getOpenController = async (req, res, next) => {
    try {
        const attendance = await AdminAttendance.findOne({ status: 'open' });
        if (!attendance) {
            throw new Error('Attendance is not running', 404);
        }
        const expiredAt = addMinutes(new Date(attendance.createdAt), attendance.timeLimit);
        if (isAfter(new Date(), expiredAt)) {
            attendance.status = 'closed';
            await attendance.save();
            throw new Error('Attendance is expired', 404);
        }
        await res.status(200).json({
            msg: 'Attendance is running', attendance
        });
    }
    catch (err) {
        next(err);
    }
}

const getDisableController = async (req, res, next) => {
    try {
        const attendance = await AdminAttendance.findOne({ status: 'open' });
        if (!attendance) {
            throw new Error('Attendance is not running', 404);
        }
        attendance.status = 'closed';
        await attendance.save();
        return res.status(200).json({
            msg: 'Attendance is Closed', attendance
        });
    }
    catch (err) {
        next(err)
    }
}

module.exports = { getEnableController, getDisableController, getOpenController };