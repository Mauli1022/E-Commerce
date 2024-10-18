import mongoose from "mongoose"

export async function dbConnect(){
    const dbName = "MernProject"

    try {
        const connInstance = await mongoose.connect(`${process.env.DB_URI}/${dbName}`)
        console.log(`DB CONNECTION SUCCESSFUL : ${connInstance.connection.host}`);
        
        
    } catch (error) {
        console.error(`DB CONNECTION FAILLED : ${error.message}`);
        
    }
}