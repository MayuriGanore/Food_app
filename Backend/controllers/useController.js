import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try
    {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Not Found"});
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Password does not Match!!"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
//create token funtion
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register User
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try{
        //checking if user already exits
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exits!!"})
        }
        //validating email format and string password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter Valid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please Choose Strong Pssword(It should be greater than 8)"})
        }
        //encypting user password
        const salt=await bcrypt.genSalt(10)//range between 5 to 15
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}