import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderDetails = () => {

    const [cart, setcart] = useState([])
    const [cartItem, setcartItem] = useState([])
    const token = localStorage.getItem("token")
    const [change, setchange] = useState(false)

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
            console.log(data.cart._id)
            console.log(data.cart.items);
            setcart(data.cart)
            setcartItem(data.cart.items);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        populateCart()
    }, [token, change])

    const navigate = useNavigate();

    const handleInitialCheckout = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/order/InitialCheckout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({cartId:id})
            })
            const data=await response.json();
            console.log(data);
            if(data.success){
                navigate(`/checkout/${data.order._id}`)
            }
        } catch (error) {

        }
    }



    return (
        <div>
            <section className="text-gray-400 body-font" style={{ backgroundColor: "#101011" }}>
                <div className="container px-5 py-24 mx-auto">

                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Your Order</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">To decrease or increase items go to the cart and do the following operations</p>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Discount</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Quantity</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Price</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem.length === 0 ? (<div>No items are present</div>) : (
                                    cartItem.map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <td className="px-4 py-3">{item.itemId.name}</td>
                                                <td className="px-4 py-3">{item.itemId.discount}%</td>
                                                <td className="px-4 py-3">{item.quantity}</td>
                                                <td className="px-4 py-3 text-lg text-white">₹{item.itemId.price}</td>
                                                <td className="px-4 py-3 text-lg text-white">₹{item.quantity * item.itemId.price}</td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                        <a className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <button onClick={()=>{handleInitialCheckout(cart._id)}} className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">₹{cart.totalPrice} Buy Now</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OrderDetails
