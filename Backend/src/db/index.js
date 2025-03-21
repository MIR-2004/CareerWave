import mongoose from 'mongoose'
import { DB_NAME } from '../constant'


const connectDB = async() => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`MongoDB connection Successsfull!!! HOST: ${(await connectionInstance).Connection.host}`)
    } catch (error) {
        
    }
}