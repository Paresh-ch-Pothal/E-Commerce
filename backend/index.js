const express=require("express")
const app=express();
const cors=require("cors")
const bodyParser=require("body-parser")
const {connectToMongoDB}=require("./connectDb");
const UserRoutes=require("./routes/user");
const ItemRoutes=require("./routes/item");
const CartRoutes=require("./routes/cart");
const OrderRoutes=require("./routes/order");

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
connectToMongoDB();
app.use('/api/user',UserRoutes);
app.use('/api/item',ItemRoutes);
app.use('/api/cart',CartRoutes);
app.use('/api/order',OrderRoutes)

const port=5000;
app.listen(port,()=>{
    console.log(`Server is running on the port: ${port}`);
})