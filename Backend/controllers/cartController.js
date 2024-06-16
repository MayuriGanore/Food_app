import userModel from "../models/userModel.js";

//adding items to user cart
const addtoCart=async(req,res)=>{
    try{
        let UserData=await userModel.findOne({_id:req.body.userId})
        let cartData=await UserData.cartData;
        if(!cartData[req.body.itemId])//creating new entry
        {
            cartData[req.body.itemId]=1
        }
        else
        {
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart Successfully!!"})
    }
    catch(error)
    {
        res.json({sucess:false,message:"Error while Adding data to cart!"})
    }
}

//removing items from user cart
const removeCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart Successfully!!"})   
    }
    catch(error)
    {
        res.json({sucess:false,message:"Error while Removing data from cart!"})
    }
}

//fetching user cart data
const getCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
    }
    catch(error)
    {
        console.log(error)
        res.json({sucess:false,message:"Error while Fetching Cart data!"})
    }
}
export {addtoCart,removeCart,getCart};