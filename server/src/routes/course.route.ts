/**
 * @desc This file is used to define the auth routes.
 */

import { Router } from "express"; // Import Router from express
import { Auth } from "../middlewares/user.auth";
const courseController = require("../controllers/course.controller"); // Import authController from controllers/auth.controller
const router: Router = require("express").Router(); // Create a new router

router.get("/all", courseController.GetCourses); // Create a new route for signup
router.get("/:course_slug", courseController.GetSingleCourse); // Create a new route for signup
router.get("/:course_slug/lessons", courseController.GetLessonsFromCourse); // Create a new route for signup
router.post("/create", Auth, courseController.CreateNewCourse); // Create a new route for signup
router.put("/update/:slug", Auth, courseController.UpdateCourse); // Create a new route for signup
router.delete("/delete/:slug", courseController.DeleteCourse); // Delete a course

module.exports = router; // Export router
