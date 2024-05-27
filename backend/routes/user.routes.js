const {Router} = require("express")
const userRouter = Router()
const {registerUser, userLogin}= require("../controller/user.controller.js");

userRouter.post("/register_user", registerUser );
userRouter.post("/login", userLogin )


module.exports = userRouter;
