import { Order } from "../../Models/Order.model.js";

// function to fetch all the order of All Users
export async function getAllOrdersOfAllUsers(req,res) {
    try {

        const allOrders = await Order.find();
        res.status(200).send({
            success : true,
            data : allOrders
        })

    } catch (error) {
        console.error("Get All Order of all User Admin: ", error);
        res.status(500).json({
            success: false,
            message: "Error Occured In Get All Order of all User Admin ."
        })
    }
}

export async function getOrderDetailsAdmin(req,res) {
    
    try {
        const {id} = req.params;
        const orderDetails = await Order.findById(id);

        if(orderDetails.length === 0 ){
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

export async function updateOrderStatus(req,res) {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        // find the Order 
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).send({
                status : false,
                message : "Order Not Found For Updation"
            })            
        }

        // when order is found update the order depending on, Order State.
        await Order.findByIdAndUpdate(id,{orderStatus})

        res.status(200).send({
            success : true,
            message : "Order Status Is Updated "
        })
        
    } catch (error) {
        console.error('Update Order Status Controller :',error);
        res.status(500).send({
            success : false,
            message : "Error Occured In Update Order Status."
        })
    }
}