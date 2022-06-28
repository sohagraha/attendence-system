const { model, Schema } = require("mongoose");

const adminAttendanceSchema = new Schema({
    timeLimit: {
        type: Number,
        required: true,
        max: 24,
        min: 5,
        default: 10
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "closed"],
        default: "open",
    },
}, { timestamps: true })

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);
module.exports = AdminAttendance;