const router = require('express').Router();
    userRoutes = require("./userRoutes");
    subcriberRoutes = require("./subscriberRoutes");
    coursesController = require("./courseRoutes");
    homeRoutes = require("./homeRoutes");
    errorRoutes = require("./errorRoutes");
    apiRoutes = require("./apiRoutes");
    
router.use("/users", userRoutes);
router.use("/subscribers", subcriberRoutes );
router.use("/courses", coursesController);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);


module.exports = router;
