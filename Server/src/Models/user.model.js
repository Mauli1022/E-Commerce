import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : 'user'
    }
})

export const User = mongoose.models.User || mongoose.model('User',userSchema)