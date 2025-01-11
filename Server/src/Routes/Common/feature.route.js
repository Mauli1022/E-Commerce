import { Router } from "express"
import { addFetureImage, getFeatureImages } from "../../Controllers/Common/feature.controller.js"

const router = Router();
router.route("/add-image").post(addFetureImage)
router.route("/get-image").get(getFeatureImages)



export default router;