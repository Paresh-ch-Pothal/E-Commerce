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
        }
    ],
    totalAmount: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'Net Banking', 'COD', 'Wallet'],
    },
    transactionId: {
        type: String,
        required: false
    },
    shippingAddress: {
        name: { type: String,  },
        phone: { type: String,  },
        address: { type: String },
        city: { type: String,  },
        state: { type: String,  },
        country: { type: String,  },
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