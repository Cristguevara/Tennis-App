import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL

const conn = {isConnected : false}

export const connectDB = async () => {
    try{
        if(conn.isConnected){return}
        const db = await mongoose.connect(MONGO_URL)
        console.log('DB connected')
        conn.isConnected = db.connections[0].readyState
    }catch (err){
        console.log('Error mongo: ',err)
    }
}