const express = require("express");
const Product = require("../model/product.js");
const User = require("../model/modal");
const router = express.Router();
const { pupload } = require("../multer");
const path=require('path')

const validateProductData = (data) => {
    const errors = [];

    // Validate name
    if (!data.name.trim()) {
        errors.push("Name is required");
    }
    if (!data.description) {
        errors.push("Description is required");
    }
    if (!data.category) {
        errors.push("Category is required");
    }
    if (!data.price || isNaN(data.price) || data.price <= 0) {
        errors.push("Proper price is required");
    }
    if (!data.stock || isNaN(data.stock) || data.stock <= 0) {
        errors.push("Proper stock is required");
    }
    if (!data.email) {
        errors.push("Email is required");
    }

    return errors;
};

// @route POST /api/products
router.post("/create-product", pupload.array("images"), async (req, res) => {
    const { name, description, category, price, stock, email, tags } = req.body;
    const images = req.files ? req.files.map((file) => {
        return  `/products/${file.filename}`
    }) : [];

    const validationErrors = validateProductData({ name, description, category, price, stock, email, tags });
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    if (images.length === 0) {
        return res.status(400).json({ message: "No images are uploaded" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Proceed to create the product
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            stock,
            email,
            tags,
            images,
            user: user._id  // Assuming a reference to the user in the product schema
        });

        await newProduct.save();
        return res.status(201).json({ message: "Product created successfully", product: newProduct });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/get-products',async(req,res)=>{
    try {
        const products=await Product.find()
        const productWithFullImgURL=products.map(product=>{
            if(product.images && product.images.length > 0){
                product.images=product.images.map(imagePath=>{
                    return imagePath
                })
            return product
            }
        })
                res.status(200).json({product: productWithFullImgURL})
    }catch(e){
        console.error('error: ',e)
        res.status(500).json({error: 'Server error.'})
    }
})

router.get('/my-products', async (req,res) => {
    const {email} = req.query;
    try{
        const products=await Product.find({email});
        res.status(200).json({products: products});
    }
    catch(err) {
        console.error('Server error: ',err);
        res.status(500).json({error: 'Server error. Could not fetch products.'})
    }
});

module.exports = router;