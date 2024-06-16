import express from require('express');
import Product from '../models/product';

const router = express.Router(); // Create an Express Router

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error getting products' });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); // Created status code
    } catch (error) {
        res.status(400).json({ message: 'Error creating product' }); // Bad request if validation fails
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error getting product' });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const updates = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product' }); // Bad request if validation fails
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

export default router;