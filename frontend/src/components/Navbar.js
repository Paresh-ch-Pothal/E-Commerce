import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import Avatar from '@mui/material/Avatar'
import { green } from '@mui/material/colors';

const Navbar = () => {
    return (
        <div>
            <header className="text-gray-400 body-font" style={{ backgroundColor: "black" }}>
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <Link className="mr-5 hover:text-white cursor-pointer" to='/'>Home</Link>
                        <Link className="mr-5 hover:text-white cursor-pointer" to='/product'>Products</Link>
                        <Link className="mr-5 hover:text-white cursor-pointer">Third Link</Link>
                        <Link className="hover:text-white cursor-pointer">Fourth Link</Link>
                    </nav>
                    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <Link className="ml-3 text-xl xl:block lg:hidden" to='/'>Tailblocks</Link>
                    </a>
                    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        <Avatar className='mx-3 cursor-pointer' sx={{ bgcolor: green[500] }} src="/broken-image.jpg">
                        </Avatar>
                        <Link className="inline-flex items-center bg-green-400 border-0 py-1 px-3 focus:outline-none hover:bg-red-500 rounded text-base mt-4 md:mt-0 text-black" to='/signin'>Signin

                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
