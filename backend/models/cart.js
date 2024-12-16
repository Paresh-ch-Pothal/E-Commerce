const mongoose=require("mongoose")
const User = require("./user")
const Item = require("./item")

const CartSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    items:[{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Item,
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        }
    },],
    totalItems:{
        type: Number,
        default: 0
    },
    totalPrice:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const Cart=mongoose.model("Cart",CartSchema)
module.exports=Cart