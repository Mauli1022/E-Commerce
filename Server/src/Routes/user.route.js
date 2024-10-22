import {Router} from "express"

// Controller
import { registerUser,loginUser, logOutUser, authMiddleware } from "../Controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logOutUser)
router.route('/checkauth').get(authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success : true,
        message : "Authenticated User",
        user 
    })
})

export default router