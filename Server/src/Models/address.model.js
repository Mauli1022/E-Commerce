import mongoose from "mongoose"

const addressSchema = new mongoose.Schema(
{
    userId : { type : String },
    address : { type : String },
    city : { type : String },
    phone : { type : String },
    notes : { type : String },
    pincode : { type : String }
},
{
    timestamps : true
})

export const Address = mongoose.models.Address || mongoose.model("Address",addressSchema)