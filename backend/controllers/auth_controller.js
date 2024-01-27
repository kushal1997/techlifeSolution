const Users = require("../models/user")
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {

    console.log(req.body)
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.json({
                status: 'error',
                message: 'Missing information in the request body',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // password: hashedPassword,
        })
        res.json({
            status:"ok",
            message: 'Registered Successfully',
            success: true

        });
    } catch (err) {
        console.log("error in register",err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            // Duplicate email error
            return res.json({
                status: 'error',
                message: 'Duplicate Email',
                success: false
            });
        }
    }
    return res.json({
        status: 'error',
        message: 'Registration failed',
        success: false
    });
}

