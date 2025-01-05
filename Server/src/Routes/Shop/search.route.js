import { Router } from "express"
import { search } from "../../Controllers/Shop/search.controller.js"

const router = Router()

router.route("/search/:keyword").get(search)


export default router