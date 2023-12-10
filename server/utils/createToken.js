const jwt = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.TOKEN_KEY;

module.exports.createToken = (id) => {
    const payload = { id }
    const token = jwt.sign(payload, secretKey);
    return token;
}