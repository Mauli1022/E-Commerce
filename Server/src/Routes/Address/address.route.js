import { Router } from "express"
import { addAddress, deleteAddress, updateAddress, fetchAllAddress } from "../../Controllers/Shop/address.controller.js"

const router = Router()

router.route("/add-address").post(addAddress)
router.route("/get-address/:userId").get(fetchAllAddress)
router.route("/delete-address/:userId/:addressId").delete(deleteAddress)
router.route("/update-address/:userId/:addressId").put(updateAddress)


export default router