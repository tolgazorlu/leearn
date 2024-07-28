/**
 * @desc This file is used to define the auth routes.
 */

import { Router } from "express"; // Import Router from express
import { Auth } from "../middlewares/user.auth";
const authController = require("../controllers/auth.controller"); // Import authController from controllers/auth.controller
const router: Router = require("express").Router(); // Create a new router

router.post("/signup", authController.Signup); // Create a new route for signup
router.post("/signin", authController.Signin); // Create a new route for signin
router.get("/get_enrolled_courses", Auth, authController.GetEnrolledCourses); // Create a new route for signup
router.post("/create_wallet", Auth, authController.CreateWallet);
router.post("/update_token", Auth, authController.UpdateToken);
router.get("/app_id", Auth, authController.GetAppID);
router.get("/get_wallet", Auth, authController.GetUserWallet);
// router.post("/acquire_session_token", Auth, authController.AcquireSessionToken);
// router.post("/initialize_user", Auth, authController.InitializeUser);

module.exports = router; // Export router
