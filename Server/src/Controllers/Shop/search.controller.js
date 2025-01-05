// Controller Function to Search functionality.
import { Product } from "../../Models/product.model.js"

export async function search(req,res){
    
    try {

        const { keyword } = req.params;
        if(!keyword || typeof keyword !== "string"){
            res.status(400).send({
                success : false,
                message : "Keyword is Required and Must be a String"
            })
        }
        const regEx = new RegExp(keyword,"i")
        const createSearchQuery = {
            $or : [
                { title : regEx },
                { description : regEx },
                { category : regEx },
                { brand : regEx }
            ]
        }

        
        const searchResults = await Product.find( createSearchQuery )

        res.status(200).send({
            success : true,
            data : searchResults
        })
 

        // res.send("Hello World")

    } catch (error) {
        console.error("Search Controller : ",error);
        res.status(500).send({
            success : false,
            message : "Some Error Occured in Search Controller Function"
        })
        
    }
}