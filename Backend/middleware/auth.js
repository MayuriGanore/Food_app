import jwt from "jsonwebtoken"

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Please try Again!!"})
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=tokenDecode.id;
        next();
    }   
    catch(error)
    {
        return res({success:false,message:"Error!!"})
    }
}
export default authMiddleware;