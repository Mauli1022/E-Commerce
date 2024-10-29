import { Router } from "express"
import { fetchAllShoppingProduct, getProductDetails } from "../../Controllers/Shop/shoppingProduct.controller.js"

const router = Router()

router.route("/get-all-product").get(fetchAllShoppingProduct)
router.route("/get-Product-details/:id").get(getProductDetails)


export default router