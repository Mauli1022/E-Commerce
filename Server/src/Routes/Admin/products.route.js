import { Router } from "express";
import { 
    handleImageUpload,
    addNewProduct,
    fetchAllProduct,
    editExistingProduct ,
    deleteProduct
} from '../../Controllers/Admin/products.controller.js'
import { upload } from "../../Helpers/cloudinary.js";

const router = Router()

router.route("/upload-image").post(upload.single('my_file'),handleImageUpload)
router.route("/add-product").post(addNewProduct)
router.route("/getall-product").get(fetchAllProduct)
router.route("/update-product/:id").put(editExistingProduct)
router.route("/delete-product/:id").delete(deleteProduct)

export default router;