const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/" , homeController.showHome); 
router.get("/contact", homeController.subscribe);
router.post("/contact", homeController.postedSignUp);
router.get("/chat", homeController.chat);
module.exports = router;