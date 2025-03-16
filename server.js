const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Budget = require('./models/Budget');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')));  // <-- THIS LINE

// API to fetch budget data
app.get('/api/budget', async (req, res) => {
    try {
        const data = await Budget.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API to add new budget data
app.post('/api/budget', async (req, res) => {
    const { title, value, color } = req.body;

    try {
        const newBudget = new Budget({ title, value, color });
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
