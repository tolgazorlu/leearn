/**
 * @desc This file is used to define the auth routes.
 */

import { Router } from "express"; // Import Router from express
const authController = require("../controllers/auth.controller"); // Import authController from controllers/auth.controller
const router: Router = require("express").Router(); // Create a new router

router.post("/signup", authController.Signup); // Create a new route for signup

module.exports = router; // Export router
