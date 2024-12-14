const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "^@12@34#%^&8@1%6$5^&#1234";

// ::: sign up routes
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(500).json({ success: false, message: "Please Provide all the details" });
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: true, message: "User Already Exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        const payload = {
            user: {
                _id: user._id,
                name: user.name
            }
        }
        const authtoken = JWT.sign(payload, JWT_SECRET);

        return res.json({ success: true, user, authtoken });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: true, message: "Some internal error may be there" })
    }
})

// ...signin routes
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: true, message: "Invalid Credentials" });
        }
        const compaarePassword = await bcrypt.compare(password, user.password);
        if (!compaarePassword) {
            return res.status(400).json({ success: false, error: "Please try with correct information" })
        }

        const payload = {
            user: {
                _id: user._id,
                name: user.name
            }
        }

        const authtoken = JWT.sign(payload, JWT_SECRET);
        return res.json({ success: true, authtoken })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some internal error may be there"})
    }

})

module.exports = router;