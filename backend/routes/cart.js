const express=require("express");
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/cart");
const Item = require("../models/item");
const router=express.Router()

// initialize a cart
router.post("/cartIntialize",fetchuser,async(req,res)=>{
    try {
        const InitiateCart=await Cart.create({
            userId: req.user._id,
            items:[],
            totalItems:0,
            totalPrice:0
        })
        return res.status(200).json({success: true,InitiateCart});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some internal issue is there"});
    }
})

// adding elements to the cart
router.post("/addElementToCart",fetchuser,async(req,res)=>{
    const {itemId,quantity}=req.body;
    try {
        const cartItem=await Item.findById(itemId);
        if (quantity > cartItem.stock){
            return res.status(400).json({success: false,message: "Quantity is higher than the stock"})
        }
        const userId=req.user._id
        const cart = await Cart.findOne({ userId: userId });
        if(!cart){
            return res.status(400).json({success: false,message: "No Cart is present"});
        }
        const itemIndex=cart.items.findIndex((item)=>item.itemId.toString() === itemId);
        if(itemIndex > -1){
            cart.items[itemIndex].quantity+=Number(quantity)
        }
        else{
            cart.items.push({itemId,quantity: Number(quantity)});
        }
        let price=0
        let item=0
        await cart.populate("items.itemId");
        cart.items.forEach(ele => {
            item=item+ele.quantity;
            price=price+(ele.itemId.price * ele.quantity);
        });
        cart.totalItems=item
        cart.totalPrice=price
        await cart.save();
        return res.status(200).json({success: true,cart})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some internal issue is there"});
    }
})

module.exports=router