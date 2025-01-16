import paypal from "../../Helpers/paypal.js"
import { Order } from "../../Models/Order.model.js";
import { Cart } from "../../Models/cart.model.js"
import { Product } from "../../Models/product.model.js"

import dotenv from "dotenv"
dotenv.config()

export async function createOrder(req, res) {

    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderData,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId
        } = req.body;        
        
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_URL}/shop/paypal-cancel`,
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }
        
        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("Error While creating Payment.",error);
                return res.status(500).send({
                    success: false,
                    message: "Error While creating paypal payment."
                })
            } else {
                const newCreatedOrder = new Order({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderData,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                    cartId
                })

                await newCreatedOrder.save();

                const approvalURL = paymentInfo.links.find(link=>link.rel == 'approval_url').href

                res.status(201).send({
                    success : true,
                    approvalURL,
                    orderId : newCreatedOrder._id,

                })
               
            }
        })



    } catch (error) {
        console.error("Create Order Error: ", error);
        res.status(500).json({
            success: false,
            message: "Error Occured In Create Order Function."
        })
    }
}

export async function capturePayment(req, res) {

    try {
        const {
            paymentId,
            payerId,
            orderId
        } = req.body;

        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).send({
                success : false,
                message : "Order Cannot Be Found."
            })
        }
        // console.log(order);
        
        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId
        order.payerId = payerId

        await order.save();
        for(let item of order.cartItems){
            let product = await Product.findById((item.productId))

            if(!product ){
                return res.status(404).send({
                    success : false,
                    message : `Not Enough Stock for this product ${product.title}`
                })
            }

            product.totalStock -= item.quantity

            await product.save()
        }

        // get the cart item
        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);
        
        res.status(200).send({
            success : true,
            message : 'Order confirmed',
            data : order
        })


    } catch (error) {
        console.error("Capture Payment Error: ", error);
        res.status(500).json({
            success: false,
            message: "Error Occured In Capture Payment Function."
        })
    }

}

export async function getAllOrdersByUser(req,res) {
    
    try {
        const { userId } = req.params;
        // console.log(userId);
        
        const orders = await Order.find({ userId });

        if(!orders.length === 0 ){

            return res.status(404).send({
                success : false,
                message : 'No Order Found.'
            })
        }

        res.status(200).send({
            success : true,
            data : orders
        })

    } catch (error) {
        console.error("Get All Order of User: ", error);
        res.status(500).json({
            success: false,
            message: "Error Occured In Get All Order By User ."
        })
    }
}

export async function getOrderDetails(req,res) {
    
    try {

        const {id} = req.params;
        const orderDetails = await Order.findById(id);

        if(!orderDetails.length === 0 ){

            return res.status(404).send({
                success : false,
                message : 'Order Not Found.'
            })
        }

        res.status(200).send({
            success : true,
            data : orderDetails
        })
        
    } catch (error) {
        console.error("Get Order Details: ", error);
        res.status(500).json({
            success: false,
            message: "Error Occured In Get Order Details."
        })
    }
}