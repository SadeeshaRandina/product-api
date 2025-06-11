const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/product');

// app.use("/api/auth", authRoutes);
// app.use("/api/product", productRoutes);

// // CORS configuration
// app.use(cors({
//     origin: '*', // Allow all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
// }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

