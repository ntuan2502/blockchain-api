var express = require("express");
var router = express.Router();
const authenticate = require("../authenticate");
const userController = require("../controllers/UserController");

router.get("/profile", authenticate.verifyUser, userController.profile);
router.post("/send", authenticate.verifyUser, userController.send);
router.get("/transaction", authenticate.verifyUser, userController.transaction);
router.get("/getBlock", authenticate.verifyUser, userController.getBlock);
router.get("/findAllBlock", authenticate.verifyUser, userController.findAllBlock);

module.exports = router;
