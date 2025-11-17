const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Seed database with sample products
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const products = [
        {
          name: 'Cool Product X',
          price: 49.99,
          description: 'The coolest product you\'ll ever need. High quality and absolutely essential for modern living.',
          image: 'https://via.placeholder.com/400x300?text=Product+X'
        },
        {
          name: 'Awesome Gadget Y',
          price: 79.99,
          description: 'An awesome gadget that makes life easier. Innovative design and top-notch performance.',
          image: 'https://via.placeholder.com/400x300?text=Gadget+Y'
        },
        {
          name: 'Super Tool Z',
          price: 29.99,
          description: 'A super tool for all your needs. Durable, reliable, and user-friendly.',
          image: 'https://via.placeholder.com/400x300?text=Tool+Z'
        },
        {
          name: 'Epic Device W',
          price: 99.99,
          description: 'The epic device that revolutionizes your daily routine. Cutting-edge technology.',
          image: 'https://via.placeholder.com/400x300?text=Device+W'
        }
      ];
      await Product.insertMany(products);
      console.log('Sample products seeded');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

seedProducts();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
