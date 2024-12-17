import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StoreIcon from '@mui/icons-material/Store';
import Item from './Item';

const Products = () => {
    const [category, setcategory] = useState('Tshirt');

    const handleChange = (event) => {
        setcategory(event.target.value);
    };

    const [items, setitems] = useState([])
    const populateItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/item/populateItems?category=${category}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            console.log(data);
            setitems(data.items)
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate()

    const handleViewImage = async (id) => {
        try {
            localStorage.setItem("itemId",id)
            navigate("/item");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        populateItems();
    }, [category])

    const token=localStorage.getItem("token");

    const handleAddToCart=async(id)=>{
        try {
            const response=await fetch(`http://localhost:5000/api/cart/addElementToCart`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : token
                },
                body: JSON.stringify({
                    itemId: id, 
                    quantity: 1 
                })
            })
            const data=await response.json()
            console.log(data);
        } catch (error) {
            
        }
    }

    

    return (
        <div>

            <section className="text-gray-400 body-font" style={{ backgroundColor: "#101011" }}>
                <div className='flex justify-center' >
                    <FormControl sx={{ mt: 4, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                        <Select style={{ backgroundColor: "white", color: "black" }}
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={category}
                            onChange={handleChange}
                            autoWidth
                            label="Category"
                        >
                            <MenuItem value={"Tshirt"}>Tshirt</MenuItem>
                            <MenuItem value={"shirt"}>shirt</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 gap-4 ml-1 border-r-4">
                        {items.length === 0 ? (<div>No items are present</div>) : (
                            items.map((item) => {
                                return (
                                    <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full" style={{ border: "1px solid #2a2a2a", borderRadius: "10px" }}>
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <img alt="ecommerce" className="object-cover object-center w-full h-full block cursor-pointer" onClick={() => { handleViewImage(item._id) }} style={{ margin: "auto" }} src={item.pic} />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                                            <h2 className="text-white title-font text-lg font-medium">{item.name}</h2>
                                            <p className="mt-1">₹{item.price}</p>
                                            <p className="mt-1">Desc: {item.desc}</p>
                                            <p className="mt-1">Discount: {item.discount}%</p>
                                        </div>
                                        <div className='mt-2 flex gap-2'>
                                            <Button variant="outlined" onClick={()=>{handleAddToCart(item._id)}}>Add To Cart <ShoppingBagIcon fontSize='small' style={{ marginLeft: "3px" }} /></Button>
                                            <Button variant="outlined">Buy Now <StoreIcon fontSize='small' style={{ marginLeft: "3px" }} /></Button>
                                        </div>
                                    </div>
                                )
                            })
                        )}



                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products
