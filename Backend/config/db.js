import mongoose from "mongoose";
export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://Mayuri:12345@cluster0.9d8azxn.mongodb.net/Food_App').then(()=>{
        console.log("Database Connected!!")
    })
}