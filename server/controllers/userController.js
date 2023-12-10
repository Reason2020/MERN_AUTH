const User = require('../models/userModel.js');
const { createToken } = require('../utils/createToken.js');
const { error, info } = require('../utils/logger.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//signup logic
const signup = async (req, res) => {
    //get user credentials from the request body
    const { username, email, password } = req.body;

    try {
        //check if all fields are filled
        if (!username || !email || !password) {
            error('All fields required');
            return res.status(400).json({ message: "All fields required." });
        }

        //check if username or email already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            error("Username already in use.");
            return res.status(400).json({ message: 'Username already in use.' });
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            error('Email already in use.');
            return res.status(400).json({ message: 'Email already in use.' });
        }

        //HASH the password before storing in the DB
        const hashedPass = await bcrypt.hash(password, 12);

        //create new user || SIGNUP USER
        const newUser = await User.create({
            email,
            username,
            password: hashedPass
        });

        const token = createToken(newUser._id);
        info(`Token: ${token}`);

        res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        });

        return res.status(201).json({ message: 'User Signed In Successfully.', user: username });
    } catch (error) {
        error(error.message);
        res.status(500).json({ message: "Could not sign in user." });
    }
}

//Login logic
const login = async (req, res) => {
    //get email and password from frontend
    const { email, password } = req.body;

    try {
        //check if email does not exist and if the password is valid with respect to email
        //check if email is valid
        const userExists = await User.findOne({ email });
        if (!userExists) {
            error("Invalid Email");
            return res.status(400).json({ message: "Invalid Email" });
        }
        //compare password from frontend with the HASHED password in the DB
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            error("Invalid Password");
            return res.status(400).json({ message: "Invalid Password" });
        }

        //generate a token
        const token = createToken(userExists._id);
        
        //set the token as a cookie
        res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        });

        res.status(200).json({ message: "Login Successful", user: userExists.username });
    } catch (err) {
        error(err);
        res.status(500).json({ message: "Could not login user" });
    }
}

const verifyToken = async (req, res) => {
    try {
        //get token from the request cookies
        const token = req.cookies.token;
        info("Received token from cookies: ", token);

        //check if token is not present
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, token is not present." });
        }

        //check if token is valid
        const tokenIsValid = jwt.verify(token, process.env.TOKEN_KEY);
        if (!tokenIsValid) {    
            info("Token is not valid");
            return res.status(401).json({ message: "Unauthorized, token is not valid." });
        }

        res.status(200).json({ message: "Authorized", success: true, user: tokenIsValid.id });
    } catch (err) {
        //in case some errors occur during verification
        res.status(401).json({ message: "Authorization Error" });
    }

}

const logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true,
        secure: true,
        sameSite: 'None'
     });

    res.status(200).json({ message: 'Logout successful.' });
}

module.exports = {
    signup, 
    login, 
    verifyToken,
    logout
}