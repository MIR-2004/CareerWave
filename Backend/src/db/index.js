import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`MongoDB connection Successsfull!!! HOST: ${connectionInstance.Connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed!!!", error)
        process.exit(1)
    }
}

export default connectDB    