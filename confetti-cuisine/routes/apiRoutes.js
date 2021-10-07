const router = require("express").Router();
const coursesController = require("../controllers/coursesControllers");
const userController = require("../controllers/userController");

router.post("/login", userController.apiAuthenticate);
router.use(userController.verifyToken);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;