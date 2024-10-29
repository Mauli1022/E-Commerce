// Product Controller for Shopping 
import { Product } from "../../Models/product.model.js"

export async function fetchAllShoppingProduct(req,res){

    try {

        // get the category and brand from the url
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

        let filters = {};
        if(category.length){
            filters.category = {$in: category.split(",")}
        }
        if(brand.length){
            filters.brand = {$in: brand.split(",")}
        }

        let sort = {}
        
        switch(sortBy){
            case "price-lowtohigh":
                sort.price = 1
                break;

            case "price-hightolow":
                sort.price = -1
                break;

            case "title-atoz":
                sort.title = 1
                break;
            
            case "title-ztoa":
                sort.title = -1
                break;

            default :
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort)
        // products.sort(sort)
        res.status(200).send({
            success : true,
            data : products
        })
 
    } catch (error) {
        console.error("Fetch and Filter Shopping Controller ",error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong"
        })
    }
}


// controller to get product details
export async function getProductDetails(req,res){

    try {

        const { id } = req.params;

        const product = await Product.findById({_id : id})

        if(!product){
            return res.status(404).send({
                success : false,
                message : "Product Not Found",
            })
        }
        res.status(200).send({
            success : true,
            message : "Product Details",
            data : product
        })

    } catch (error) {
        console.error("Get Product Details Controller : ",error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong"
        })
    }

}