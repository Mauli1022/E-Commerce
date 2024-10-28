// Product Controller for Shopping 
import { Product } from "../../Models/product.model.js"

export async function fetchAllShoppingProduct(req,res){

    try {

        const products = await Product.find({})

        res.status(200).send({
            success : true,
            data : products
        })
 
    } catch (error) {
        console.error("Fetch and Filter Shopping Controller ",error);
        res.status(500).send({
            success : true,
            message : "Something Went Wrong"
        })
        
    }

}