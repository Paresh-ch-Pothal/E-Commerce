import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CheckoutPage = () => {
    const { id } = useParams();
    const [checkout, setCheckout] = useState({
        city: "", state: "", country: "", address: "", phone: ""
    })
    const [isCheckout, setIsCheckout] = useState(false)

    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/order/FinalCheckout`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ orderId: id, city: checkout.city, state: checkout.state, country: checkout.country, address: checkout.address, phone: checkout.phone })
            })
            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log("Saved The Details please click on proceed")
            }
        } catch (error) {

        }
    }

    const onChange = (e) => {
        setCheckout({ ...checkout, [e.target.name]: e.target.value })
    }

    const handlePayment = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/order/create-payment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({orderId:id})
            })
            const data=await response.json();
            console.log(data);
        } catch (error) {

        }

    }

    return (
        <div style={{ backgroundColor: "#101011", height: "60vh" }}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <h1 className='text-lg text-white text-center py-5 font-medium' style={{ fontSize: "2.2rem" }}>CheckOut</h1>
                <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-400">City</label>
                            <input onChange={onChange} value={checkout.city} type="text" id="city" name="city" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-400">State</label>
                            <input onChange={onChange} value={checkout.state} type="text" id="state" name="state" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div><div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="country" className="leading-7 text-sm text-gray-400">Country</label>
                            <input onChange={onChange} value={checkout.country} type="text" id="country" name="country" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-400">Phone</label>
                            <input onChange={onChange} value={checkout.phone} type="text" id="phone" name="phone" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label htmlFor="address" className="leading-7 text-sm text-gray-400">Address</label>
                            <input onChange={onChange} value={checkout.address} type="text" id="address" name="address" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <button onClick={handleCheckout} className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Save</button>
                    </div>
                    <div className="p-2 w-full">
                        <button onClick={() => { handlePayment() }} className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Proceed For Payment</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckoutPage
