import { Router } from "express"
import { addProductReview, getProductReview } from "../../Controllers/Shop/productReview.controller.js"


const router = Router()

router.route("/create-route").post(addProductReview)
router.route("/get-review/:productId").get(getProductReview)


export default router