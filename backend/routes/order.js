const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Item = require("../models/item");
const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const router = express.Router()

// .. without using the cart object ordered something
router.post("/orderWithoutCart", fetchuser, async (req, res) => {
    const { itemId, quantity, paymentMethod, transactionId, phone, address, city, state, country } = req.body
    try {
        const orderUser = await User.findById(req.user._id);
        const orderItem = await Item.findById(itemId);
        if (!orderItem) {
            return res.status(400).json({ success: false, message: "Order item not found" });
        }
        const order = await Order.create({
            userId: req.user._id, items: [
                { itemId: itemId, quantity, price: orderItem.price }
            ], totalAmount: quantity * (orderItem.price),
            paymentMethod, transactionId, shippingAddress: {
                name: orderUser.name, phone, address, city, state, country
            }
        })
        orderUser.address = address
        orderUser.state = state
        orderUser.city = city
        orderUser.country = country
        orderUser.phone = phone
        await orderUser.save()
        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Some errorm has been occured" });
    }
})


//.. order with cart object
router.post("/orderWithCart", fetchuser, async (req, res) => {
    try {
        const { cartId, paymentMethod, transactionId, phone, address, city, state, country } = req.body
        const orderCart = await Cart.findById(cartId);
        const orderUser = await User.findById(req.user._id);
        const orderuseritem = []
        let totalAmount = 0

        for (const ele of orderCart.items) {
            const eachitem = await Item.findById(ele.itemId);
            if (!eachitem) {
                return res.status(400).json({ success: false, message: `Item with ID ${ele.itemId} not found` });
            }
            const demo = { itemId: ele.itemId, quantity: ele.quantity, price: eachitem.price };
            orderuseritem.push(demo);
            totalAmount += ele.quantity * eachitem.price;
        }
        const order = await Order.create({
            userId: req.user._id, items: orderuseritem, totalAmount: totalAmount, paymentMethod, transactionId, shippingAddress: {
                name: orderUser.name, phone, address, city, state, country
            }, cartId: cartId
        })
        orderUser.address = address
        orderUser.state = state
        orderUser.city = city
        orderUser.country = country
        orderUser.phone = phone
        await orderUser.save()
        return res.status(200).json({ success: true, order });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Some errorm has been occured" });
    }
})

module.exports = router