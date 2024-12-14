const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    country:{
        type: String,
    },
    address:{
        type: String,
    },
    mobile:{
        type: String,
    },
},{
    timestamps: true
})

const User=mongoose.model("User",UserSchema);
module.exports=User;