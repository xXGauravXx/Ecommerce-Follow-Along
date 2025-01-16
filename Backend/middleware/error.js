const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if (err.name === "Cast Error") {
        const message = `Resources not found wiht this id .. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.code === "JsonWebToeknError") {
        const message = `Your URL is invalid please try again later`;
        err = new ErrorHandler(message, 400);
    }
    if (err.code === "TokenExpiredError") {
        const message = `Your URL is expired please try again later`;
        err = new ErrorHandler(message, 400);
    }

    res.status(statusCode).json({
        success:false,
        message: err.message,
    });
}