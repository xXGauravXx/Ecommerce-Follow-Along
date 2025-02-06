const express = require("express");
const path = require("path"); // Require the path module
const app = express();
const user = require("./controller/user");
const product = require("./controller/product");
const cors = require("cors");
const errorHandler = require("./middleware/error");

app.use(errorHandler);

app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

// Fix: Remove "this" and use path module correctly
app.use('/products', express.static(path.join(__dirname, 'products')));

app.use("/api/v2/user", user);
app.use("/api/v2/product", product);

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config.env",
    });
}

app.get("/", (_req, res) => {
    return res.send("Welcome to backend");
});

module.exports = app;
