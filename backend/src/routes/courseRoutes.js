const express = require('express');
const { getCourses, createCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
    .get(protect, getCourses)
    .post(protect, authorize('SuperAdmin', 'UniversityAdmin', 'Teacher'), createCourse);

module.exports = router;
