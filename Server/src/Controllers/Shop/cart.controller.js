// import { mongo } from "mongoose";
import { Cart } from "../../Models/cart.model.js"
import { Product } from '../../Models/product.model.js'

export async function addToCart(req,res){
    try {
        
        const { userId, productId, quantity } = req.body;
        
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
            message : "Product is Added",
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

        const {userId} = req.params;

        if(!userId){
            return res.status(400).send({
                success : false,
                message : "User Id is Required"
            })
        }

        // Get The Catr For the Specific User
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price salePrice"
        })
        const userData = await Cart.findOne({userId}).populate({
            path : "userId",
            select : "email role"
        })
        // console.log(userData);
        
        if(!cart){
            return res.status(404).send({
                success : false,
                message : "Cart Not Found"
            })
        }
        
        // console.log(cart);
        
        const validItem = cart.items.filter(productItem=> productItem.productId)
        // console.log(validItem);
        
        if(validItem.length < cart.items.length){
            cart.items = validItem
            await cart.save();
        }

        // console.log(cart);
        
        const populateCartItems = validItem.map(item=>({
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salePrice : item.productId.salePrice,
            quantity : item.quantity,
        }))
        // console.log("Populate Cart Items : " , populateCartItems);
        
        res.status(200).send({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong In Fetch Cart Product to Cart"
        })
        
    }
}

export async function updateCartQuantity(req,res){
    try {
        const { userId, productId, quantity } = req.body;
        
        if (!userId || !productId || !quantity) {
            return res.status(400).send({
                success : false,
                message : "Provide All the Required Data"
            })
        }

        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).send({
                success : false,
                message : "Cart Not Found"
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString()===productId)
        if(findCurrentProductIndex === -1){
            return res.status(404).send({
                success : false,
                message : "Cart item not present"
            })
        }
        cart.items[findCurrentProductIndex].quantity = quantity

        await cart.save();

        await cart.populate({
            path : "items.productId",
            select : "image title price salePrice"
        })

        const populateCartItems = cart.items.map(item=>({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : "Product Not Found",
            price : item.productId ? item.productId.price : null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity,
        }))

        res.status(200).send({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

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

        const { userId, productId } = req.params;
        if (!userId || !productId ) {
            return res.status(400).send({
                success : false,
                message : "Provide All the Required Data"
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path : "items.productId",
            select : "image title price salePrice"
        })
        if(!cart){
            return res.status(404).send({
                success : false,
                message : "Cart Not Found"
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
        await cart.save();

        await cart.populate({
            path : "items.productId",
            select : "image title price salePrice"
        })
        
        const populateCartItems = cart.items.map(item=>({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : "Product Not Found",
            price : item.productId ? item.productId.price : null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity,
        }))
        
        res.status(200).send({
            success : true,
            message : "Product Removed Successfully",
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong IN delete Cart Items"
        })
        
    }
}