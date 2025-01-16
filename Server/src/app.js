import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin : process.env.CLIENT_URL,
    methods : ['GET','POST','DELETE','PUT'],
    allowedHeaders : [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// import all the routes
import userRoute from "./Routes/user.route.js"
import adminProductRouter from "./Routes/Admin/products.route.js"
import shopProductRouter from './Routes/Shop/shopProduct.route.js'
import cartRouter from "./Routes/Cart/cart.route.js"
import addressRouter from "./Routes/Address/address.route.js"
import createOrderRouter from "./Routes/Shop/orders.route.js"
import adminOrderRouter from "./Routes/Admin/adminOrder.route.js"
import searchRouter from "./Routes/Shop/search.route.js"
import productReviewRouter from "./Routes/Shop/productReview.route.js"
import featureImageRouter from "./Routes/Common/feature.route.js"

app.use("/api/auth",userRoute)
app.use("/api/admin",adminProductRouter)
app.use("/api/shop",shopProductRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",createOrderRouter)
app.use("/api/admin-order",adminOrderRouter)
app.use("/api/search-shop",searchRouter)
app.use('/api/product-review',productReviewRouter)
app.use("/api/feature-image",featureImageRouter)

export { app }; 