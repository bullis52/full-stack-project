const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const {PORT, MONGO_CONNECT_URL, NODE_ENV} = require('./configs/config');
const {authRouter,userRouter} = require('./routes');
const {ALLOWED_ORIGIN} = require('./configs/config');
const ErrorHandler = require("./errors/ErrorHandler");


mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(cors({origin: _configureCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth',authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});


app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});


function _configureCors(origin,callback){
    if (NODE_ENV === 'dev'){
        return callback(null,true);
    }
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)){
        return callback(new ErrorHandler('CORS IS NOT ALLOWED'),false);
    }
    return callback(null,true);
};

