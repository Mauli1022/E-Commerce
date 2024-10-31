import mongoose, { trusted } from "mongoose"

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    // Cart
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true
            },
            quantity : {
                type : Number,
                required : true,
                min : 1
            }
        }
    ]
},{
    timestamps : true
})

export const Cart = mongoose.models.Cart || mongoose.model("Cart",cartSchema)