const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema({
    createAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
    }
})

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema)
module.exports = StudentAttendance