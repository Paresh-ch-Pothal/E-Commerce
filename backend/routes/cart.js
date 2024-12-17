const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/cart");
const Item = require("../models/item");
const router = express.Router()

router.post("/addElementToCart", fetchuser, async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        // Validate if the item exists and check stock availability
        const cartItem = await Item.findById(itemId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        if (quantity > cartItem.stock) {
            return res.status(400).json({ success: false, message: "Quantity exceeds available stock" });
        }

        // Fetch the user's cart or create one if it doesn't exist
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

        // Check if the item is already in the cart
        const itemIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId);

        if (itemIndex > -1) {
            // Update quantity if item exists in cart
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            // Add new item to cart
            cart.items.push({ itemId, quantity: Number(quantity) });
        }

        // Recalculate total price and total items
        await cart.populate("items.itemId"); // Populate item details
        cart.totalItems = cart.items.reduce((sum, ele) => sum + ele.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, ele) => sum + ele.itemId.price * ele.quantity, 0);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Some internal issue occurred" });
    }
});

// populating the items of a particular cart
router.get("/populateCartItems",fetchuser,async(req,res)=>{
    try {
        const userId=req.user._id
        const cart = await Cart.findOne({ userId: userId }).populate({
            path: "items.itemId",
            select: "name price pic discount"
        });
        return res.status(200).json({success: true,cart});
    } catch (error) {
        
    }
})

module.exports = router