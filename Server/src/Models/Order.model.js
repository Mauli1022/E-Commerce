import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId : String,
    cartId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            quantity : Number
        }
    ],
    addressInfo : {
        addrressId : String,
        address : String,
        city : String,
        pincode : String,
        phone : String,
        notes : String
    },
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : Number,
    orderData : Date,
    orderUpdateDate : Date,
    paymentId : String,
    payerId : String,

})

export const Order = mongoose.models.Order || mongoose.model("Order",orderSchema)