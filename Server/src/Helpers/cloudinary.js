import cloudinary from "cloudinary"
import multer from "multer"

import dotenv from 'dotenv';
dotenv.config();
// console.log("Cloud Name",process.env.PORT);

cloudinary.config({
    cloud_name : `${process.env.CLOUDINARY_CLOUDNAME}`,
    api_key : `${process.env.CLOUDINARY_API_KEY}`,
    api_secret : `${process.env.CLOUDINARY_API_SECRET}`
 });


const storage = new multer.memoryStorage();

export async function ImageUploadUtils(file) {
   
        const result = await cloudinary.uploader.upload(file,{
            resource_type : "auto",
            folder : "Home/ProductImage"
        })
        
        return result;
}

export const upload = multer({storage});

