import { Router } from "express"
import { addFetureImage, getFeatureImages, deleteFeatureImage } from "../../Controllers/Common/feature.controller.js"

const router = Router();
router.route("/add-image").post(addFetureImage)
router.route("/get-image").get(getFeatureImages)
router.route("/delete-image/:id").delete(deleteFeatureImage)



export default router;