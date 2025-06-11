const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// CREATE
router.post('/', async (req, res) => {
  const { prod_id, name, price, quantity } = req.body;
  
  // Check for duplicate prod_id
  const existingProduct = await Product.findOne({ prod_id });
  if (existingProduct) {
    return res.status(400).json({ message: 'prod_id already exists' });
  }

  const product = new Product({ prod_id, name, price, quantity });
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
  const prodId = Number(req.params.id);
  if (isNaN(prodId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = await Product.findOne({ prod_id: prodId });
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const prodId = Number(req.params.id);
  if (isNaN(prodId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const { name, price, quantity } = req.body;
  const product = await Product.findOneAndUpdate(
    { prod_id: prodId }, 
    { name, price, quantity },
    { new: true }
  );

  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const prodId = Number(req.params.id);
  if (isNaN(prodId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = await Product.findOneAndDelete({ prod_id: prodId });
  if (product) res.json({ message: 'Product deleted' });
  else res.status(404).json({ message: 'Product not found' });
});

module.exports = router;