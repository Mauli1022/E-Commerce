import { Feature } from "../../Models/features.model.js"

// for admin to save the image in database
export async function addFetureImage(req,res) {

    try {

        const { image } = req.body;
        console.log(req.body);

        if (!image) {
            return res.status(400).send({
                success : false,
                message : "Please Select Image",
            })
        }
        
        const featureImages = Feature( { image } )

        if(!featureImages){
            return res.status(500).send({
                success : false,
                message : "Something Went Wrong While Storing the Feature Image."
            })
        }

        await featureImages.save()

        res.status(201).send({
            success : "true",
            message : "Image Successfully Added."
        })
        
    } catch (error) {
        console.error("Add Feature Image Controller : ", error);
        res.status(500).send({
            success : false,
            message : "Add feature Image Controller Error"
        })
    }
}

// For Client View 
export async function getFeatureImages(req,res) {

    try {

        const images = await Feature.find();

        res.status(200).send({
            success : "true",
            data : images
        })

        
    } catch (error) {
        console.error("Get Feature Image Controller : ", error);
        res.status(500).send({
            success : false,
            message : "Get feature Image Controller Error"
        })
        
    }

}