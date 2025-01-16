import { User } from '../Models/user.model.js';
import bcryjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register User
export async function registerUser(req, res) {
    const { userName, email, password } = req.body;

    try {
        const salt = await bcryjs.genSalt(10)
        const hashPass = await bcryjs.hash(String(password), salt)

        // Check for User Exist or not 
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(403).json({ success: false, message: "User Already Exist" })
        }

        const newUser = new User({
            userName,
            email,
            password: hashPass
        })
        await newUser.save()

        // console.log(newUser);

        res.status(201).json({
            success: true,
            message: 'Registration Successful.'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error Occured",
            error: error
        })
    }
}


// Login User
export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {

        // Check for User Exist or not 
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.send({ 
                success : false,
                message: "User Not Found, Please Register First" })
        }

        const checkPass = await bcryjs.compare(String(password), userExist.password)
        // console.log(checkPass);
        if (!checkPass) {
            return res.send(
                {
                    success : false,
                    message : "Invalid Password"
                }
            )
        }
        
        // Create Token
        const token = jwt.sign({
            id : userExist._id,
            role : userExist.role,
            email : userExist.email,
            userName : userExist.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : '180m'
        }
    )

    /*
    res.cookie('token',token,{
        httpOnly : true,
        secure : true,

    })
    .json({
        success : true,
        message : "Logged In Successfully",
        user : {
            email : userExist.email,
            role : userExist.role,
            id : userExist._id,
            userName : userExist.userName
        }
    })
        */

    res.status(200).send({
        success : true,
        message : "Logged In Successfully.",
        token,
        user : {
            email : userExist.email,
            role : userExist.role,
            id : userExist._id,
            userName : userExist.userName
        }
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error Occured"
        })
    }
}



// Logout User
export async function  logOutUser(req,res) {
    res.clearCookie("token",).json({
        success : true,
        message : "Logged Out Successfully"
    })
}
 
// Auth-middleware
/*
export async function authMiddleware(req,res,next) {
    // console.log(req.cookies.token);
    
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized User"
        })
    }

    try {
        // Decode the user
        const decoded = jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.error(error);
        
        res.status(401).json({
            success : false,
            message : "Unauthorized User"
        })
    }
}
*/

export async function authMiddleware(req,res,next) {
    // console.log(req.cookies.token);
    
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    
    if(!token){
        console.log(token,"My Token");
        return res.status(401).send({
            success : false,
            message : "Unauthorized User"
        })
    }
    
    try {
        // Decode the user
        const decoded = jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        // console.error("Auth Middleware error: ",error);
        
        res.status(401).send({
            success : false,
            message : "Unauthorized User"
        })
    }
}
