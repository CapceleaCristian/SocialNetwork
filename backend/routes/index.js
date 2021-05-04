const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter/authRouter");
const userRouter = require("./userRouter/userRouter");

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
