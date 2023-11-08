import mongoose from "mongoose";

const DetailsSchema= new mongoose.Schema(
    {
        mobile_no:{
            type:String,
          },
          address:{
            type:String,
          },
          githubLink:{
            type:String
          },
          linkedinLink:{
            type:String
          },
          bio:{
            type:String
          },
          profile:{
            public_id:String,
            url:String,
          },
          user_id:{
            type:String,
          }
    },
    {
        timestamps:true
    }
)

export const UserDetail = mongoose.model("UserDetail" , DetailsSchema);
