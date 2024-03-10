import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


const connect = ()=>{
    mongoose.connect(process.env.DB).then(()=>{
        console.log("Connection successful")
    })
}

export default connect;