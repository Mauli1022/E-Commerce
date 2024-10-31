import { mongo } from "mongoose";
import { Cart } from "../../Models/cart.model.js"
import { Product } from '../../Models/product.model.js'

export async function addToCart(req,res){
    try {
        
        const { userId, productId, quantity } = req.body;
        let NumQuantity = Number(quantity)
        console.log(typeof NumQuantity);
        
        
        if (!userId || !productId || !quantity) {
            return res.status(400).send({
                success : false,
                message : "Provide All the Required Data"
            })
        }

        // find The product
        const product = await Product.findById(productId)
        // console.log(product);
        if(!product){
            return res.status(400).send({
                success : false,
                message : "Product Not Found"
            })
        }
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items : []})
        }
        const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString() === productId)

        if(findCurrentProductIndex === -1){
            cart.items.push({productId,quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity += Number(quantity)
        }

        await cart.save();

        res.send({
            success : true,
            data : cart
        })
        

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong IN Add to Cart"
        })
        
    }
}

export async function fetchCartItems(req,res){
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong IN Add to Cart"
        })
        
    }
}

/*
export async function addToCart(req,res){
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong IN Fetch Cart Items"
        })
        
    }
}
    */

export async function updateCartQuantity(req,res){
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong IN Update Cart Quantity"
        })
        
    }
}

export async function deleteCartItems(req,res){
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong IN delete Cart Items"
        })
        
    }
}