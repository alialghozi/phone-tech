const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // To allow cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String, // Can store Base64 or image URL
    category: String
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.post('/addProduct', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category
    });
    
    newProduct.save((err) => {
        if (err) {
            res.status(500).send('Error adding product');
        } else {
            res.send('Product added successfully');
        }
    });
});

app.get('/getProducts', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).send('Error retrieving products');
        } else {
            res.json(products);
        }
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
