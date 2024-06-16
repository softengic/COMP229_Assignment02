import express from 'express';
import { Product } from '../models/product.model.js';

const router = express.Router(); // Create an Express Router

router.get('/', async (req, res) => {
    const name = req.query.name; // Access query parameter
    try {
        let products;
        if (name) {
            // 7. GET products by name search (query parameter)
            products = await Product.find({ name: { $regex: new RegExp(name, 'i') } }); // Case-insensitive search
        } else {
            // 1. GET all products
            products = await Product.find({});
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error getting products' });
    }
});

// 2. GET product by ID
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

// 3. POST new product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); // Created status code
    } catch (error) {
        res.status(400).json({ message: 'Error creating product' }); // Bad request if validation fails
    }
});

// 4. PUT update product by ID
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

// 5. DELETE product by ID
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

// 6. DELETE all products (Caution: use with care!)
router.delete('/', async (req, res) => {
    try {
        await Product.deleteMany({}); // Delete all products
        res.json({ message: 'All products deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting all products' });
    }
});

export default router;