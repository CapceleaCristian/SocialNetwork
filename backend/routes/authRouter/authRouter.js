const Router = require("express");
const UserController = require("../../controllers/userController");
const router = new Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
module.exports = router;
