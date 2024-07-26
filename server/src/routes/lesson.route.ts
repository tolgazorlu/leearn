/**
 * @desc This file is used to define the auth routes.
 */

import { Router } from "express"; // Import Router from express
const lessonController = require("../controllers/lesson.controller");
const router: Router = require("express").Router(); // Create a new router

router.post("/create/:course_slug", lessonController.CreateNewLesson);
// router.get("/all", lessonController.GetLessons);
// router.delete("/delete/:slug", lessonController.DeleteCourse);

module.exports = router; // Export router
