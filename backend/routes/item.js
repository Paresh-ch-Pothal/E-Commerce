const express=require("express");
const Item = require("../models/item");
const router=express.Router();
const fetchuser=require("../middleware/fetchuser")

// adding item to the shop
router.post("/addItem",fetchuser,async(req,res)=>{
    try {
        const {name,desc,category,price,stock,pic,discount,seller}=req.body;
        if (!category || !price){
            return res.status(400).json({success: false,message: "Please provide all the necesary details"})
        }
        const item=await Item.create({
            name,desc,category,price,stock,pic,discount,seller : req.user._id
        })
        return res.status(200).json({success: true,item})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some error might be occured"});
    }
})

// updating the stock of a particular item
router.put("/updateStock/:id",async(req,res)=>{
    try {
        const itemId=req.params.id;
        const {stock}=req.body;
        const item=await Item.findById(itemId);
        if(!item){
            return res.status(400).json({success: false,message: "No item is present"})
        }
        item.stock=item.stock - stock
        await item.save();
        return res.status(200).json({success: true,item});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Some error might be occured"});
    }
})

// populate the items on the product page
router.get("/populateItems",async(req,res)=>{
    try {
        const {category}=req.query;
        const items=await Item.find({category: category})
        return res.status(200).json({success: true,items});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Some error might be occured"});
    }
})

module.exports=router