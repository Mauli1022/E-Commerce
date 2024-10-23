import { Router } from "express";
import { handleImageUpload } from '../../Controllers/Admin/products.controller.js'
import { upload } from "../../Helpers/cloudinary.js";

const router = Router()

router.route("/upload-image").post(upload.single('my_file'),handleImageUpload)

export default router;