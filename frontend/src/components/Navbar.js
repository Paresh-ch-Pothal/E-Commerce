import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import Avatar from '@mui/material/Avatar'
import { green } from '@mui/material/colors';
import { Menu, MenuItem } from '@mui/material';
import SideDrawer from './SideDrawer';
import logo1 from './Image/Logo1.png'


const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate=useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMyOrders=()=>{
        navigate('/userorders');
    }
    const handleLogout=()=>{
        localStorage.removeItem("token");
        window.location.reload()
        navigate("/signin")
    }

    return (
        <div>
            <header className="text-gray-400 body-font" style={{ backgroundColor: "black" }}>
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <Link className="mr-5 hover:text-white cursor-pointer" to='/'>Home</Link>
                        <Link className="mr-5 hover:text-white cursor-pointer" to='/product'>Products</Link>
                        <Link className="mr-5 hover:text-white cursor-pointer">About Us</Link>
                        <Link className="hover:text-white cursor-pointer" to='/contact'>Contact Us</Link>
                    </nav>
                    <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
                        <img src={logo1} alt="" style={{height: "30px",width: "30px"}}/>
                        <Link className="ml-3 text-xl xl:block lg:hidden" to='/'>ShopSphere</Link>
                    </div>
                    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        <Avatar className='mx-1 cursor-pointer' sx={{ bgcolor: green[500] }} src="/broken-image.jpg" aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                        </Avatar>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem >Profile</MenuItem>
                            <MenuItem onClick={handleMyOrders}>My Orders</MenuItem>
                            {localStorage.getItem("token") && 
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                        </Menu>
                        <SideDrawer />
                        {!localStorage.getItem("token") && 
                        <Link className="inline-flex items-center bg-green-400 border-0 py-1 px-3 focus:outline-none hover:bg-red-500 rounded text-base mt-4 md:mt-0 text-black" to='/signin'>Signin
                        </Link> }
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
