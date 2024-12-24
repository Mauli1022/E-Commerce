import { Router } from "express";
import { createOrder } from "../../Controllers/Shop/order.controller.js"

const router = Router()

router.route('/create-product').post(createOrder)


export default router;