import React from 'react'
import logo1 from './Image/Logo1.png'

const Footer = () => {
    return (
        <div>
            <footer className="text-gray-400 body-font" style={{backgroundColor: "black"}}>
                <div className="container px-5 py-6 mx-auto">
                    <div className="flex flex-wrap md:text-left text-center order-first">
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Home</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-400 hover:text-white">Easy-to-Use Cart</a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-white">Secure Authentication</a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-white">Seamless Payment Gateway</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Products</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-400 hover:text-white">Shirt</a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-white">Tshirt</a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-white">Many More</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Authentication</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-400 hover:text-white">Signin</a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-white">Signup</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Others</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-400 hover:text-white">About Us</a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-white">Contact Us</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className=" bg-opacity-75" style={{backgroundColor: "black"}}>
                    <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                            <img src={logo1} alt="" style={{height: "30px",width: "30px"}}/>
                            <span className="ml-3 text-xl">ShopSphere</span>
                        </a>
                        <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">© 2024 ShopSphere
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                            <a className="text-gray-400">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-400">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-400">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-400">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
