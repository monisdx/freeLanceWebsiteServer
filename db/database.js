import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.Promise = global.Promise ;
mongoose.set('strictQuery', false);

dotenv.config()

// const uri = 'mongodb://127.0.0.1:27017/';
const uri = process.env.MONGODB_URI ;

export const connectDb = async () =>{
     const ans = await mongoose
     .connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected...' ))
     .catch(err => console.log( err ));
}