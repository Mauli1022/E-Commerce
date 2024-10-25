import { ImageUploadUtils } from "../../Helpers/cloudinary.js";
import { Product } from "../../Models/product.model.js"

// Controller to upload Image On Cloudinary 
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

// Controller to add a new Product 
export async function addNewProduct(req,res){
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice ,
        totalStock
    } = req.body;
    // console.log(image);
    try {
        const newProduct = Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        })
        await newProduct.save();
        // console.log(newProduct);
        if (newProduct) {
            return res.status(201).send({
                success : true,
                message : "Product Add Successfuly",
                data : newProduct
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Error Occured."
        })
    }
}

// Fetch all Product 
export async function fetchAllProduct(req,res) {
    try {

        const allProduct = await Product.find({});
        // console.log(allProduct);
        if (allProduct) {
            res.status(200).send({
                success : true,
                message : "All Product",
                data : allProduct
            })
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Error Occured."
        })
    } 
}

// Controller to edit a Product 
export async function editExistingProduct(req,res) {
    const { id } = req.params;
    const { 
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
     } = req.body;
    // const updateData = req.body;
    
    try {
        
        const productExist = await Product.findById(id)
        if(!productExist){
            return res.send({
                success : false,
                message : "Product Does not Exist."
            })
        }        
        // console.log(productExist.title);
        let updateProduct = await Product.findByIdAndUpdate({_id : id},{
            image: image || productExist.image,
            title: title || productExist.title,
            description: description || productExist.description,
            category: category || productExist.category,
            brand: brand || productExist.brand,
            price: price || productExist.price,
            salePrice: salePrice || productExist.salePrice,
            totalStock: totalStock || productExist.totalStock
        },
        {
            new : true,
            runValidators : true
        })

        if(updateProduct){
            return res.send({
                success : true,
                message : "Product Updated Sucessfuly",
                data : updateProduct
            })
        }
            
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Error Occured."
        })
    }
}

// Controller to delete a Product
export async function deleteProduct(req,res){
    
    const { id } = req.params;
    
    try {
        let deleteProduct = await Product.findByIdAndDelete({_id : id})
        // console.log(deleteProduct);
        if (!deleteProduct) {
            return res.status(404).send({
                success : false,
                message : "Message Not Found."
            })
        }
        res.send({
            success : true,
            message : "Product Deleted Sucessfuly."
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Error Occured."
        })
    }
}
