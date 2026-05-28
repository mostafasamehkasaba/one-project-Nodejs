const express = require("express");

const router = express.Router();

const couresrControlar = require("../controles/courses.controles");

const { validationSchema } = require("../middlewares/valitionSchema");
const veryfiyToken = require("../middlewares/veryfiytoken");
const userRoles = require("../utiles/roles");
const allowto = require("../middlewares/allowto");
// const allowto = require("../middlewares/allowto");

router.route("/")
    .get(couresrControlar.getAllcourses)
    .post(
        validationSchema(),
        couresrControlar.addCourse
    );

router.route("/:courseId")
    .get(couresrControlar.getCourse)
    .patch(couresrControlar.updateCourse)
    .delete(veryfiyToken,allowto(userRoles.ADMIN,userRoles.MANGER),couresrControlar.deleteCourse);

module.exports = router;