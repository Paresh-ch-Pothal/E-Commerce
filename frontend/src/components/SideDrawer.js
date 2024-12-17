import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import DeleteIcon from '@mui/icons-material/Delete';


const SideDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // const DrawerList = (
    //     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    //         <List>
    //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                 <ListItem key={text} disablePadding>
    //                     <ListItemButton>
    //                         <ListItemIcon>
    //                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //                         </ListItemIcon>
    //                         <ListItemText primary={text} />
    //                     </ListItemButton>
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                 <ListItem key={text} disablePadding>
    //                     <ListItemButton>
    //                         <ListItemIcon>
    //                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //                         </ListItemIcon>
    //                         <ListItemText primary={text} />
    //                     </ListItemButton>
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </Box>
    // );

    const [cart, setcart] = useState([])
    const [cartItem, setcartItem] = useState([])
    const token = localStorage.getItem("token")

    const populateCart = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/populateCartItems`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            })

            const data = await response.json();
            console.log(data.cart.items);
            setcart(data.cart)
            setcartItem(data.cart.items);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        populateCart()
    }, [token])

    return (


        <div style={{ backgroundColor: "black" }}>
            <Avatar style={{ backgroundColor: '#3d4a8a', color: 'white' }} className='mx-2 cursor-pointer' onClick={toggleDrawer(true)}>
                <ShoppingCartIcon />
            </Avatar>
            <Drawer open={open} onClose={toggleDrawer(false)} sx={{ display: "flex", gap: "3px" }}>
                {cartItem.length === 0 ? (<div>no cart is present</div>) : (
                    cartItem.map((item) => {
                        return (
                            <Box key={item._id} component="section" sx={{ p: 1, border: '1px dashed grey', backgroundColor: "#78787c", width: "30vw", height: "14vh", display: "flex", gap: "2px", m: "3px" }}>
                                <Box sx={{ width: "30%", border: "1px solid black", height: "100%" }}>
                                    <img style={{ height: "100%", width: "90%" }} src={item.itemId.pic ? item.itemId.pic : "loading ... "} alt="" />
                                </Box>
                                <Box sx={{ width: "65%", border: "1px solid black", height: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                                    <Box sx={{ width: "100%", display: "flex" ,justifyContent: "space-between"}}>
                                        <Box>{item.itemId.name ? item.itemId.name : "loading ... "}</Box>
                                        <DeleteIcon />
                                    </Box>
                                    <Box sx={{ width: "100%", display: "flex" }}>
                                        <Box sx={{ width: "50%" }}>Price: {item.itemId.price ? item.itemId.price : "loading ... "}</Box>
                                        <Box sx={{ width: "50%" }}>Discount: {item.itemId.discount ? item.itemId.discount : "loading ... "}%</Box>
                                    </Box>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <Box sx={{ width: "50%" }}>Quantity: {item.quantity ? item.quantity : "loading ... "}</Box>
                                        <Box sx={{ width: "50%" }}>Total: {item.itemId.price * item.quantity}</Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                )}
                <Button variant="outlined">Buy Now <StoreIcon fontSize='small' style={{ marginLeft: "3px" }} /></Button>
            </Drawer>
        </div>
    )
}

export default SideDrawer
