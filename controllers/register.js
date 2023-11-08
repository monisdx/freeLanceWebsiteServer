import {User} from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Jobs } from '../models/Jobs.js';
import {validationResult} from 'express-validator';

export const Register = async (req,res)=>{
    const errors = validationResult(req).errors;
    if (errors.length!=0) {
      return res.status(400).json({ sucess:false , errors: errors });
    }
    const {first_name ,last_name , email , password , role} = req.body ;
    
        try {

            let user = await User.findOne({email});
            if(user) return res.status(201).json({sucess:false , message: "User Already Exist..."});

            const hashedPassword = await bcrypt.hash(password , 10);

            user = await User.create({first_name , last_name ,role , email , password:hashedPassword })
                
            const token = jwt.sign({_id:user._id} , "idhgfuighuehgkjjg"); 
            return res.status(200).json({sucess:true , token , message:"Registered Successfully"});

        } catch (error) {
            console.log(error);
            res.status(500).json({sucess:false , message:error});
        }
    
}

export const Login = async (req,res) =>{
    const errors = validationResult(req).errors;
    if (errors.length!=0) {
      return res.status(400).json({ sucess:false , errors: errors });
    }
    const {email , password} = req.body ;

    try {
        const user = await User.findOne({email});

       if(!user){
         return res.status(201).json({sucess:false , message:"Invalid Credentials ..."});
       }
       const isMatch = await bcrypt.compare(password,user.password);

       if(!isMatch) return res.status(201).json({sucess:false , message:"Invalid Credentials ..."});

       const token = jwt.sign({_id:user._id} , "idhgfuighuehgkjjg");

       return res.status(200).json({sucess:true , token , message:"Logged In" , user});
    } catch (error) {
        res.status(201).json({sucess:false , message:error});
    }
}


export const getDetail = async(req,res)=>{
    const {_id} = req.user_name ;
    try {
        let user = await User.findById({_id});

        res.status(200).json({ sucess:true , message:"user found" , user});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error})
    }
    
}


export const getuser_by_userid = async(req,res)=>{
    try {
        const user_id = req.params['id'] ;
        const user = await User.findById({_id:user_id});

        res.status(200).json({sucess:true , message:"User Found" , user});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error:error});
        console.log(error);
    }
}


export const get_user_applied_job = async(req,res)=>{
    try {
        const {_id} = req.user_name ;
        const Alljobs = await Jobs.find();
        const Applied_jobs = [{}];

        Alljobs.forEach(job=>{
            if(job.applied_user.includes(_id)){
                Applied_jobs.push(job);
            }
        })

        res.status(200).json({sucess:true , message:"All Applied Jobs of Student" , jobs:Applied_jobs});
    } catch (error) {
        res.status(500).json({sucess:false , message:"server Error " , error});
        console.log(error);
    }
}