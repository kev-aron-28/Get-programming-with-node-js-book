const router = require("express").Router();
const subscriberController = require("../controllers/subscriberController");


router.get("/", subscriberController.index, subscriberController.indexView);
router.get("/new", subscriberController.createView);
router.get("/:id", subscriberController.detail, subscriberController.showDetail);

router.post("/create", subscriberController.create, subscriberController.redirectView);

router.get("/:id/edit", subscriberController.edit);
router.put("/:id/update", subscriberController.update, subscriberController.redirectView);


module.exports = router;