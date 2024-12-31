const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Item = require("../models/item");
const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const paypal = require("../routes/paypal")
const router = express.Router()



// initial checkout
router.post("/InitialCheckout", fetchuser, async (req, res) => {
    try {
        const { cartId } = req.body;
        if (!cartId) {
            return res.status(400).json({ success: false, message: "Please provide the cartId" })
        }
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(400).json({ success: false, message: "cart is not present" })
        }
        const order = await Order.create({
            userId: req.user._id,
            items: cart.items,
            totalAmount: cart.totalPrice,
            cartId: cartId
        })
        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.log(error);
    }
})

//final checkout
router.post("/FinalCheckout", fetchuser, async (req, res) => {
    try {
        const { orderId, phone, address, city, state, country } = req.body
        const order = await Order.findById(orderId);
        if (req.user._id !== order.userId.toString()) {
            return res.status(400).json({ success: false, message: "User is not same" })
        }
        const user = await User.findById(req.user._id);
        user.address = address;
        user.city = city;
        user.state = state;
        user.country = country;
        await user.save();
        order.shippingAddress = {
            name: user.name,
            phone: phone,
            address: address, city: city, state: state, country: country
        }
        await order.save();
        return res.status(200).json({ success: true, order })
    } catch (error) {

    }
})


//creating the payment
router.post("/create-payment", async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const createPaymentJson = {
            intent: "sale",
            payer: { payment_method: "paypal" },
            redirect_urls: {
                return_url: `http://localhost:5000/api/order/success?orderId=${orderId}`,
                cancel_url: `http://localhost:5000/api/order/cancel`,
            },
            transactions: [
                {
                    amount: {
                        total: order.totalAmount,
                        currency: "USD",
                    },
                    description: `Order ID: ${orderId}`,
                },
            ],
        };

        paypal.payment.create(createPaymentJson, (error, payment) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: "Payment creation failed" });
            } else {
                const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;
                return res.status(200).json({ success: true, approvalUrl });
            }
        });
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// if the payment is success
router.get("/success", async (req, res) => {
    const { orderId } = req.query;

    if (!orderId) {
        return res.status(400).json({ success: false, message: "Missing orderId in query" });
    }

    try {
        // Fetch the order from your database
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Retrieve payment details from PayPal
        paypal.payment.get(order.transactionId, async (error, payment) => {
            if (error) {
                console.error("Error retrieving payment details:", error);
                return res.status(500).json({ success: false, message: "Failed to verify payment" });
            }

            // Verify the payment details
            if (payment.transactions[0].amount.total !== order.totalAmount.toString()) {
                return res.status(400).json({ success: false, message: "Payment amount mismatch" });
            }

            // Update the order status
            order.paymentStatus = "Completed";
            order.transactionId = payment.id; // Ensure transactionId is saved during payment creation
            await order.save();

            // return res.redirect(`/order-confirmation/${orderId}`);
            return res.status(400).json({ success: true, message: "Payment successful by user" });
        });
    } catch (error) {
        console.error("Error handling payment success:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});




// for cancelling the order
router.get("/cancel", async (req, res) => {
    return res.status(400).json({ success: false, message: "Payment cancelled by user" });
});



module.exports = router