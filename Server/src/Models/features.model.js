import mongoose from "mongoose"

const featureSchema = new mongoose.Schema({
    image : String
},{
    timestamps : true
})

export const Feature = mongoose.models.Feature || mongoose.model("Feature", featureSchema);