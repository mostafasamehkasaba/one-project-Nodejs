// let courses = require("../data/courses");

const { validationResult } = require("express-validator");

const Course = require("../models/course.schema");

const httpSucess = require("../utiles/httpSuccess");
const asynsWrapper = require("../middlewares/asynsWrapper");
const AppError = require("../middlewares/appError");

const getAllcourses = asynsWrapper(async (req, res) => {

    let query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const courses = await Course.find({}, { "__v": false })
        .limit(limit)
        .skip(skip);

    res.json({
        status: httpSucess.SUCESS,
        data: { courses }
    });
});

const getCourse = asynsWrapper(
    async (req, res, next) => {

        const course = await Course.findById(req.params.courseId);

        if (!course) {

            const error = new AppError(
                "course not found",
                404,
                httpSucess.FAIL
            );

            return next(error);
        }

        res.json({
            status: httpSucess.SUCESS,
            data: { course }
        });
    }
);

const addCourse = asynsWrapper(async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const error = new AppError(
            errors.array(),
            400,
            httpSucess.FAIL
        );

        return next(error);
    }

    const newCourse = new Course(req.body);

    await newCourse.save();

    res.status(201).json({
        status: httpSucess.SUCESS,
        data: { newCourse }
    });
});

const updateCourse = asynsWrapper(async (req, res, next) => {

    const coursedId = req.params.courseId;

    const updatecourse = await Course.updateOne(
        { _id: coursedId },
        { $set: { ...req.body } }
    );

    res.status(200).json({
        status: httpSucess.SUCESS,
        data: { updatecourse }
    });
});

const deleteCourse = asynsWrapper(async (req, res, next) => {

    const data = await Course.deleteOne({
        _id: req.params.courseId
    });

    res.status(200).json({
        status: httpSucess.SUCESS,
        data: { data }
    });
});

module.exports = {
    getAllcourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
};