const express = require("express");
const { User } = require("../model/auth");
const bcrypt = require('bcrypt');
const { AuthMiddleware } = require("../middleware/auth");
const { Product } = require("../model/products");
const productRouter = express.Router();


productRouter.get("/getAllProducts", async (req, res) => {
    try {
        // const { user } = req;
        const products = await Product.find({});

        res.send({ message: "Product data fetched successfully", products });

    } catch (error) {
        res.status(400).send({ message: "BAD REQUEST", error: error.message });
    }
});

productRouter.get("/getProduct/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        res.send({ message: "Product fetched successfully", product });

    } catch (error) {
        res.status(400).send({ message: "BAD REQUEST", error: error.message });

    }
})

productRouter.post("/addProduct", async (req, res) => {
    try {
        const {user} = req;


        const { name, description, price, category, imageUrl, inStock } = req.body;
        const product = await Product(
            {
                name,
                description,
                price,
                category,
                imageUrl,
                inStock,
                userId: user._id
            }
        );

        await product.save();
        res.send({ message: "Products added successfully", product })
            ;
    } catch (error) {
        res.status(400).send({ message: "BAD REQUEST", error: error.message });
    }
})

productRouter.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new Error("Product not found");
        }

        res.send({ message: "Product deleted successfully", product });
    } catch (error) {
            res.status(400).send({ message: "BAD REQUEST", error: error.message });

    }
})

productRouter.patch('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

     const product = await Product.findByIdAndUpdate(id, data);

     if (!product) {
            throw new Error("Product not found");
        }



        res.send({ message: "Product updated successfully" , product});



    } catch (error) {
        res.status(400).send({ message: "BAD REQUEST", error: error.message });
    }
})

module.exports = {
    productRouter
}




