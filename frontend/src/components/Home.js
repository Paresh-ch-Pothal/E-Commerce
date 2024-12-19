import React from 'react'
import SliderPage from './SliderPage';
import logo from './Image/Logo.png'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate();
    return (
        <div>
            <section className="text-gray-400 body-font" style={{backgroundColor: "#101011"}}>
                <div className="container px-5 py-24 mx-auto">
                    <div className="text-center mb-20">
                        <img src={logo} alt="" style={{height: '40vh',width: "22vw",margin: "auto"}} />
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">Welcome to ShopSphere !</h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Your go-to destination for a wide range of high-quality products at unbeatable prices. From fashion and electronics to home goods and more, we make it easy to find exactly what you need. Fast shipping, secure payments, and excellent customer service make shopping with us a breeze!</p>
                        <div className="flex mt-6 justify-center">
                            <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                <AddShoppingCartIcon fontSize='large'/>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">Easy-to-Use Cart</h2>
                                <p className="leading-relaxed text-base">Our intuitive shopping cart ensures a seamless experience. Add, remove, or update items in your cart with a single click. View the total price and manage your purchases effortlessly, all in one place.</p>
                                <a className="mt-3 text-purple-400 inline-flex items-center">Learn More
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                <VpnKeyIcon fontSize='large'/>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">Easy Authentication</h2>
                                <p className="leading-relaxed text-base">Sign up or log in within seconds using secure and user-friendly authentication. Whether it's email, phone, or social media, our streamlined process ensures your data is protected while giving you quick access to your account.</p>
                                <a className="mt-3 text-purple-400 inline-flex items-center">Learn More
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                <CurrencyRupeeIcon fontSize='large'/>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">Easy Payment Methods</h2>
                                <p className="leading-relaxed text-base">Enjoy hassle-free transactions with multiple secure payment options. Whether you prefer credit cards, digital wallets, or UPI, our platform ensures a smooth and reliable checkout process every time.</p>
                                <a className="mt-3 text-purple-400 inline-flex items-center">Learn More
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>{
                        navigate("/signin")
                    }} className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Lets Started</button>
                </div>
            </section>

            {/* <div className='swipper ' style={{backgroundColor: "#101011",paddingBottom: "20px"}}>
            <SliderPage/>
            </div> */}
        </div>
    )
}

export default Home
