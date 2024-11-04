import { Router } from "express"
import { addToCart,fetchCartItems,updateCartQuantity,deleteCartItems } from "../../Controllers/Shop/cart.controller.js"

const router =  Router()

router.route("/add-cart-product").post(addToCart)
router.route("/fetch-cart-product/:userId").get(fetchCartItems)
router.route("/update-cart-product").put(updateCartQuantity)
router.route("/delete-cart-product/:userId/:productId").delete(deleteCartItems)



export default router;