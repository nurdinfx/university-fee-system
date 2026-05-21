const Department = require('../models/Department');

exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('headOfDepartment', 'firstName lastName email');
        res.status(200).json({ success: true, count: departments.length, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json({ success: true, data: department });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
