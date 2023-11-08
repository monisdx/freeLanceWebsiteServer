import mongoose from "mongoose";

const JobSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'Title is required'],
            minlength:3,
          },
          description:{
            type:String,
            required:[true,'Description is required'],
            minlength:3,
          },
          client_id:{
            type:String,
            required:true,
          },
          budget:{
            type:String
          },
          skills:{
            type:[],
          },
          category:{
            type:String
          },
          applied_user:{
            type:[],
            default: undefined
          }
    },
    {
        timestamps:true
    }
)

export const Jobs = mongoose.model("Jobs" , JobSchema);
