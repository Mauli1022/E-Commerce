import { Router } from "express"
import { addToCart } from "../../Controllers/Shop/cart.controller.js"

const router =  Router()

router.route("/add-product").post(addToCart)



export default router;