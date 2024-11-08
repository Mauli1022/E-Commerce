import { Address } from "../../Models/address.model.js"

export async function addAddress(req,res) {

    try {
        const { userId, address , city, pincode, phone, notes} = req.body;
        

        if( !userId || !address  || !city || !pincode || !phone || !notes){
            return res.status(400).send({
                success : false,
                message : "All Fields Are Required."
            })
        }

        const newAddress = new Address({ userId, address, city, pincode, phone, notes })

        await newAddress.save()

        res.status(201).send({
            success : true,
            message : "Address Stored.",
            data : newAddress
        })

    } catch (error) {
        console.error(error);
        res.status(500)
        .send({
            success : false,
            message : "Add Address Controller Error"
        })
        
    }
}

export async function fetchAllAddress(req,res) {

    try {
        const { userId } = req.params;
        if( !userId){
            return res.status(400).send({
                success : false,
                message : "All Fields are Requird"
            })
        }

        const myAddress = await Address.findOne({userId : userId});
        console.log(myAddress);
        
        
        res.status(200).send({
            status : true,
            data : myAddress
        })
        
    } catch (error) {
        console.error(error);
        res.status(500)
        .send({
            success : false,
            message : "Fetch Address Controller Error"
        })
        
    }
}

export async function updateAddress(req,res) {

    try {

        const { userId, addressId } = req.params;
        const formData = req.body;
        // console.log({userId, addressId},formData);
        
        if(!userId || !addressId){
            return res.status(400).send({
                success : false,
                message : "All Fields are required."
            })
        }

        const prevAddress = await Address.find({
            $or : [{_id : addressId}]
        })
        // console.log(prevAddress);

        if(!prevAddress){
            return res.status(404).send({
                status : false,
                message : "Address Does not Exist."
            })
        }
        
        const updatedAddress = await Address.findByIdAndUpdate(
            {
               _id : addressId
            },
            {
                userId : prevAddress.userId,
                address : formData.address || prevAddress.address,
                city : formData.city || prevAddress.city,
                phone : formData.phone || prevAddress.phone,
                notes : formData.notes || prevAddress.notes,
                pincode: formData.pincode || prevAddress.pincode
            },
            { 
                new : true 
            })
            
        // if(!updatedAddress){
        //     return res.status(404).send({
        //         success : false,
        //         message : "Address Not Found."
        //     })
        // }

        res.status(200).send({
            success : true,
            data : updatedAddress
        })

    } catch (error) {
        console.error(error);
        res.status(500)
        .send({
            success : false,
            message : "Edit Address Controller Error"
        })
        
    }
}

export async function deleteAddress(req,res) {

    try {

        const { userId, addressId } = req.params;

        if(!userId || !addressId){
            return res.status(400).send({
                success : false,
                message : "All Fields are required."
            })
        }

        const address = await Address.findOneAndDelete({_id : addressId, userId})
        if(!address){
            return res.status(404).send({
                success : false,
                message : "Address Not Found."
            })
        }

        res.status(200).send({
            success : true,
            message : "Address Deleted Successfully."
        })

        
    } catch (error) {
        console.error(error);
        res.status(500)
        .send({
            success : false,
            message : "Add Address Controller Error"
        })
        
    }
}