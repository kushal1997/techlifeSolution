const Users = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
        return res.json({
            status: "ok",
            message: 'Registered Successfully',
            success: true

        });
    } catch (err) {
        console.log("error in register", err)
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

module.exports.login = async (req, res) => {
    console.log(req.body);

    try {
        const user = await Users.findOne({
            email: req.body.email,
            password: req.body.password,
        });

        if (user) {
            // Set token expiration time (e.g., 1 hour)
            const tokenExpiration = '1h';

            const token = jwt.sign({
                name: user.name,
                email: user.email
            },
                'your-secret-key', // Use a strong secret key
                { expiresIn: tokenExpiration }
            );

            return res.status(200).send({
                success: true,
                message: "Login successful",
                token: token,
                data:user
            });
        } else {
            return res.status(400).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
};