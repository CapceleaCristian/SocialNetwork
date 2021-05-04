const Router = require("express");
const userController = require("../../controllers/userController");
const router = new Router();

router.get("/", userController.getUsers);
router.get("/profile", userController.getProfile);
module.exports = router;
