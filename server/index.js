const express = require('express');
require('dotenv').config();
const userRoute = require('./routes/userRoute.js');
const requestLogger = require('./middlewares/requestLogger.js');
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT, MONGO_URL } = process.env;

//MIDDLEWARES
app.use(requestLogger);
app.use(express.json());
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true
}));
app.use(cookieParser());

//ROUTES
app.use('/api/users', userRoute);

mongoose.connect(MONGO_URL)
    .then(() => {
        info('Database Connected Successfully');
    })
    .then(() => {
        app.listen(PORT, () => {
            info(`Server listening at port ${PORT}`);
        });
    })
    .catch(err => {
        error(err);
    });