const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('department', 'name code').populate('teacher', 'firstName lastName');
        res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
