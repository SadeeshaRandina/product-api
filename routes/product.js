// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// CREATE
router.post('/', async (req, res) => {
  const { name, price, quantity } = req.body;
  const product = new Product({ name, price, quantity });
  await product.save();
  res.status(201).json(product);
});

// READ ALL
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, quantity },
    { new: true }
  );
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) res.json({ message: 'Product deleted' });
  else res.status(404).json({ message: 'Product not found' });
});

module.exports = router;
