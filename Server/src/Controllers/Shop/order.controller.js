import paypal from "../../Helpers/paypal.js"
import { Order } from "../../Models/Order.model.js";

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
            payerId
        } = req.body;        

        // create payment json
        
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel',
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
                    payerId
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

    } catch (error) {
        console.error("Capture Payment Error: ", error);
        res.status(500).json({
            success: false,
            message: "Error Occured In Capture Payment Function."
        })
    }

}