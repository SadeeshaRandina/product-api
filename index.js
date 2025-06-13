const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/users');

app.use('/users', userRoutes);
app.use("/product", productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
