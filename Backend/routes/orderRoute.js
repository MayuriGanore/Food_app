import express from "express"
import authMiddleware from "../middleware/auth.js"
import {updateStatus, listOrders,placeOrder, verifyOrder,usersOrder } from "../controllers/orderController.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,usersOrder)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;