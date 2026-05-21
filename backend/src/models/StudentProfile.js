const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    enrollmentDate: { type: Date, default: Date.now },
    batch: { type: String },
    guardianName: { type: String },
    guardianContact: { type: String },
    address: { type: String },
    cgpa: { type: Number, default: 0.0 }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
