import { Router } from "express"
import { fetchAllShoppingProduct } from "../../Controllers/Shop/shoppingProduct.controller.js"

const router = Router()

router.route("/get-all-product").get(fetchAllShoppingProduct)


export default router