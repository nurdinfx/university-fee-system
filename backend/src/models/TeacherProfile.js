const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    designation: { type: String },
    joiningDate: { type: Date, default: Date.now },
    specialization: { type: String },
    salary: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);
