import { Router } from "express";
import { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails } from "../../Controllers/Shop/order.controller.js"

const router = Router()

router.route('/create-product').post(createOrder)
router.route('/capture-payment').post(capturePayment)
router.route('/all-users-order/:userId').get(getAllOrdersByUser)
router.route('/single-order-details/:id').get(getOrderDetails)


export default router;