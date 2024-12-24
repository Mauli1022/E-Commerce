import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin : 'http://localhost:5173',
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

app.use("/api/auth",userRoute)
app.use("/api/admin",adminProductRouter)
app.use("/api/shop",shopProductRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",createOrderRouter)

export { app }; 