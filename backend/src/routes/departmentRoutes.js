const express = require('express');
const { getDepartments, createDepartment } = require('../controllers/departmentController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
    .get(protect, getDepartments)
    .post(protect, authorize('SuperAdmin', 'UniversityAdmin'), createDepartment);

module.exports = router;
