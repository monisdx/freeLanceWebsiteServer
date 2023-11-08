import mongoose from "mongoose";

const UserSchema= new mongoose.Schema(
    {
        first_name:{
            type:String,
            required:[true,'First Name is required'],
            minlength:3,
          },
          last_name:{
            type:String,
          },
          role:{
            type:String,
          },
          email:{
            type:String,
            required:[true,'Email is required'],
            minlength:3,
            match:[
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email'
            ],
            unique:true,
          },
          password:{
            type:String,
            required:[true,'Password is required'],
            minlength:6,
          }
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model("User" , UserSchema);
