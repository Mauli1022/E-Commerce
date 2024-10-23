import { ImageUploadUtils } from "../../Helpers/cloudinary.js";


export async function handleImageUpload(req,res){
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64")
        // console.log(`My Base64 File : ${b64}`);
        // const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = 'data:' + req.file.mimetype + ";base64," + b64 ;

        const result = await ImageUploadUtils(url)

        res.json({
            success : true,
            data : result
        })

    } catch (error) {
        console.error('Handle Image Upload',error);
        res.json({
            success : false,
            message : "Error Occured"
        })
    }
}