import { Router } from "express";
import { 
    getAllOrdersOfAllUsers, 
    getOrderDetailsAdmin, 
    updateOrderStatus 
} from "../../Controllers/Admin/adminOrder.controller.js"

const router = Router()
router.route("/all-users-order").get(getAllOrdersOfAllUsers)
router.route("/admin-order-details/:id").get(getOrderDetailsAdmin)
router.route("/update-order-status/:id").put(updateOrderStatus)


export default router