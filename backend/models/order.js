const mongoose = require("mongoose");
const User = require("./user");
const Item = require("./item");
const Cart = require("./cart");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: Item, required: true },
            quantity: {
                type: Number, required: true, min: 1
            },
            price: {
                type: Number, required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "Completed", "Failed"],
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'Net Banking', 'COD', 'Wallet'],
        required: true
    },
    transactionId: {
        type: String,
        required: false
    },
    shippingAddress: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Processing',
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Cart,
        required: false
    }

},{
    timestamps: true
})

const Order=mongoose.model("Order",OrderSchema);
module.exports=Order;