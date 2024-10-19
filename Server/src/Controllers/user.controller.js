import { User } from '../Models/User.model.js';
import bcryjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register User
export async function registerUser(req,res){
    const { userName, email, password } = req.body;
    
    try {
        const salt = await bcryjs.genSalt(10)
        const hashPass = await bcryjs.hash(String(password), salt)

        const newUser = new User({
            userName,
            email,
            password : hashPass 
        })
        await newUser.save()

        console.log(newUser);
        
        res.status(201).json({
            success : true,
            message : 'Registration Successful.'
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message : "Some error Occured"
        })  
    }
}


// Login User
export async function loginUser(req,res){
    const { email, password } = req.body;
    
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message : "Some error Occured"
        })  
    }
}



// Logout User


// Auth-middleware