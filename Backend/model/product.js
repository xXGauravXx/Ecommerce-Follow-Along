const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Product name is required."],
        },
        description: {
            type: String,
            required: [true, "Product description is required."],
        },
        category: {
            type: String,
            required: [true, "Product category is required."],
        },
        tags:{
            type: [String], //Array of strings representing product tags
            default: [],
            required: [true, "Product tags are required."],
        },
        price: {
            type: Number,
            required: [true, "Product price is required."],
        },
        stock: {
            type: Number,
            required: [true, "Product stock is required."],
        },
        images: {
            type: [String], //Array of strings representing product images
            default: [],
            required: [true, "Product images are required."],
        },
        email:{
            type: String,
            required: [true, "Product email is required."],
            unique: true,
            match: [/.+@.+\..+/, "Invalid email format."],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }

);

module.exports = mongoose.model("product", productSchema);