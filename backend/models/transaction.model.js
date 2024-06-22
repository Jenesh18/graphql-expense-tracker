import mongoose from "mongoose";
import { required } from "nodemon/lib/config";

 const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    paymentType:{
        type:String,
        required:true,
        enum:["cash", "card"]
    },
    category:{
        type:String,
        required:true,
        enum:["saving", "expense", "investment"]
    },
    amount:{
        type:Number,
        required:true,
    },
    loaction:{
        type:String,
        default:"Unknown"
    },
    date:{
        type: Date,
        required:true,
    }
 },{timestamps:true})

 const Transaction = mongoose.model("Transaction",transactionSchema);
 export default Transaction;