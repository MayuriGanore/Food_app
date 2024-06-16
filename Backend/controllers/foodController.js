import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,messge:"Food Added Successfully"})
    }catch(error)
    {
        console.log(error)
        response.json({success:false,message:"error"})
    }
}
//listing food 
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
//removing food item from collection
const removeFood=async (req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed Successfully!!"})
    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {addFood,listFood,removeFood}