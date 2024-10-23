import { app } from "./app.js";
import dotenv from "dotenv"
import { dbConnect } from "./db/index.js";

dotenv.config({
    path : "./.env"
})
// console.log(process.env.CLOUDINARY_CLOUDNAME);

const PORT = process.env.PORT || 7000

dbConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running : http://localhost:${PORT}`);
    })
})
.catch((error)=>{
    console.error(`FAILLED TO CONNECT TO DATABASE ${error.message}`);
})