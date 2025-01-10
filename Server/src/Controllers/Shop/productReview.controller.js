import { Productreview } from "../../Models/review.model.js"
import { Order } from "../../Models/Order.model.js"
import { Product } from "../../Models/product.model.js"

export async function addProductReview(req, res) {

    try {

        const {
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue
        } = req.body;

        // first find order that user previously bought
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'confirmed'
        })
        if (!order) {
            return res.status(403).send({
                success: false,
                message: 'First Order The Product To Review It'
            })
        }

        // dont allow single user to give review multiple times
        const checkExistingReview = await Productreview.findOne({ productId, userId })
        if (checkExistingReview) {
            return res.status(400).send({
                success: false,
                message: "You can't Review Same Product Multiple Times."
            })
        }

        const newReview = new Productreview(
            {
                productId,
                userId,
                userName,
                reviewMessage,
                reviewValue
            })

        await newReview.save();

        const reviews = await Productreview.find({ productId })
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => 
            sum + reviewItem.reviewValue, 0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId, { averageReview })

        res.status(201).send({
            success: true,
            data: newReview
        })

    } catch (error) {
        console.error("Add Product Review Controller : ", error);
        res.status(500).send({
            success: false,
            message: "Error Occured in Add Product Review Controller"
        })
    }
}

export async function getProductReview(req, res) {

    try {
        const { productId } = req.params;

        const reviews = await Productreview.find({
            productId
        })

        res.status(200).send({
            success: true,
            data: reviews
        })

    } catch (error) {
        console.error("Get Product Review : ", error);
        res.status(500).send({
            success: false,
            message: "Error Occured in Get Product Review Controller"
        })

    }

}