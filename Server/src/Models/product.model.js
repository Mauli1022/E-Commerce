import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    image : {
        type : String,
    },
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    category : {
        type : String,
    },
    brand : {
        type : String,
    },
    price : {
        type : Number,
    },
    salePrice : {
        type  : Number
    },
    totalStock :{
        type : Number
    } 
},{
    timestamps : true
})

export const Product = mongoose.models.Product || mongoose.model("Product",productSchema);