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

app.use("/api/auth",userRoute)

export { app }; 