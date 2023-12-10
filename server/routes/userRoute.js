const userRoute = require('express').Router();
const { 
    signup, 
    login,
    verifyToken,
    logout
} = require('../controllers/userController.js');

//signup route
userRoute.post('/signup', signup);

//login route
userRoute.post('/login', login);

//token verification route
userRoute.get('/verifytoken', verifyToken);

//logout route
userRoute.get('/logout', logout);

module.exports = userRoute;