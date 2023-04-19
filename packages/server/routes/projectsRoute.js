const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//verifyJWT is used to protect routes from not authenticated users
// router.use(verifyJWT);
//postman request url http://localhost:3001/api/v1/project
router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

router
  .route("/user/:userId")
  .get(projectController.getProjectByAuthor);

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.get("/logout", authController.logout);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);
// router.get("/me", userController.getMe, userController.getUser);
// router.patch(
// 	"/updateMe",
// 	userController.uploadUserPhoto,
// 	userController.resizeUserPhoto,
// 	userController.updateMe,
// );
// router.delete("/deleteMe", userController.deleteMe);

// router.use(authController.restrictTo("admin"));

// router
// 	.route("/:id")
// 	.get(userController.getUser)
// 	.patch(userController.updateUser)
// 	.delete(userController.deleteUser);

module.exports = router;

// test endpoints using postman and the following commands:

// POST http://localhost:3001/api/v1/users/signup
// POST http://localhost:3001/api/v1/users/login
// GET http://localhost:3001/api/v1/users/me
// PATCH http://localhost:3001/api/v1/users/updateMe
// DELETE http://localhost:3001/api/v1/users/deleteMe
// PATCH http://localhost:3001/api/v1/users/updateMyPassword
// POST http://localhost:3001/api/v1/users/forgotPassword
// PATCH http://localhost:3001/api/v1/users/resetPassword/1234567890
// GET http://localhost:3001/api/v1/users
// GET http://localhost:3001/api/v1/users/5f7e1b9b9c1b9c1b9c1b9c1b
// PATCH http://localhost:3001/api/v1/users/5f7e1b9b9c1b9c1b9c1b9c1b
// DELETE http://localhost:3001/api/v1/users/5f7e1b9b9c1b9c1b9c1b9c1b
