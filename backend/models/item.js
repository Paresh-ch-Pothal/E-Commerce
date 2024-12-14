const mongoose=require("mongoose");
const User = require("./user");

const ItemSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    desc:{
        type: String,
    },
    category:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    pic:{
        type: String,
    },
    discount:{
        type: Number,
        default: 0
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    }
},{
    timestamps: true
})

const Item=mongoose.model("Item",ItemSchema);
module.exports=Item;