const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/cart");
const Item = require("../models/item");
const router = express.Router()

router.post("/addElementToCart", fetchuser, async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        const cartItem = await Item.findById(itemId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        if (quantity > cartItem.stock) {
            return res.status(400).json({ success: false, message: "Quantity exceeds available stock" });
        }
        const userId = req.user._id;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = await Cart.create({
                userId: userId,
                items: [],
                totalItems: 0,
                totalPrice: 0
            });
        }
        const itemIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ itemId, quantity: Number(quantity) });
        }
        await cart.populate("items.itemId");
        cart.totalItems = cart.items.reduce((sum, ele) => sum + ele.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, ele) => sum + (ele.itemId.price * ele.quantity), 0);

        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Some internal issue occurred" });
    }
});

// ordering a single item
router.post("/orderSingleItem",fetchuser,async(req,res)=>{
    try {
        const userId=req.user._id
        const {itemId,quantity}=req.body
        const item=await Item.findById(itemId);
        await Cart.deleteMany({userId:userId})
        const newCart=await Cart.create({
            userId,
            items:[{itemId:itemId,quantity:quantity}],
            totalItems:quantity,
            totalPrice:quantity*item.price

        })
        return res.status(200).json({success: true,newCart})
    } catch (error) {
        
    }
})

// populating the items of a particular cart
router.get("/populateCartItems", fetchuser, async (req, res) => {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ userId: userId }).populate({
            path: "items.itemId",
            select: "name price pic discount"
        });
        return res.status(200).json({ success: true, cart });
    } catch (error) {

    }
})

// deleting a item from the cart
router.delete("/deleteItemFromCart/:itemId", fetchuser, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const userId = req.user._id
        const cart = await Cart.findOne({ userId: userId }).populate({
            path: "items.itemId",
            select: "price"
        });
        const index = cart.items.findIndex((item) => item.itemId._id.toString() == itemId)
        if (index == -1) {
            return res.status(500).json({ success: false, message: "The deleted item si not present" });
        }
        const removedItem = cart.items[index]
        cart.totalItems = cart.totalItems - removedItem.quantity
        cart.totalPrice = cart.totalPrice - removedItem.quantity*removedItem.itemId.price
        cart.items.splice(index, 1);
        await cart.save()
        return res.status(200).json({ success: true, cart })
    } catch (error) {

    }
})

// Increase and decrease the quantity of a particular item
router.put("/increaseQuantity/:itemId", fetchuser, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId: userId }).populate({
            path: "items.itemId",
            select: "price stock"
        });
        const index = cart.items.findIndex((item) => item.itemId._id.toString() === itemId)
        if (index == -1) {
            return res.status(500).json({ success: false, message: "NO item is present" })
        }
        if (cart.items[index].itemId.stock < cart.items[index].quantity + 1) {
            return res.status(500).json({ success: false, message: "No of quantiy exceeding the stock" })
        }
        cart.items[index].quantity = cart.items[index].quantity + 1;
        cart.totalItems = cart.totalItems + 1;
        cart.totalPrice = cart.totalPrice + 1 * cart.items[index].itemId.price;
        await cart.save();
        return res.status(200).json({ success: true, cart })
    } catch (error) {

    }
})

router.put("/decreaseQuantity/:itemId", fetchuser, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId: userId }).populate({
            path: "items.itemId",
            select: "price stock"
        });
        const index = cart.items.findIndex((item) => item.itemId._id.toString() === itemId)
        if (index == -1) {
            return res.status(500).json({ success: false, message: "NO item is present" })
        }
        if (cart.items[index].quantity - 1 < 0) {
            return res.status(500).json({ success: false, message: "-1 quantity we donot provide" })
        }
        cart.items[index].quantity = cart.items[index].quantity - 1;
        cart.totalItems = cart.totalItems - 1;
        cart.totalPrice = cart.totalPrice - 1 * cart.items[index].itemId.price;
        await cart.save();
        return res.status(200).json({ success: true, cart })
    } catch (error) {

    }
})

module.exports = router