/**
 * @desc This file is used to define the auth routes.
 */

import { Router } from "express"; // Import Router from express
const courseController = require("../controllers/course.controller"); // Import authController from controllers/auth.controller
const router: Router = require("express").Router(); // Create a new router

router.post("/create", courseController.CreateNewCourse); // Create a new route for signup
router.get("/all", courseController.GetCourses); // Create a new route for signup

module.exports = router; // Export router
