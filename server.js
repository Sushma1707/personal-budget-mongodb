const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Budget = require('./models/Budget');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mongodb_demo')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// GET route to fetch all budget data
app.get('/api/budget', async (req, res) => {
    try {
        const budget = await Budget.find();
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add new budget data
app.post('/addNewBudget', async (req, res) => {
    const { title, budget, color } = req.body;
    try {
        const newBudget = new Budget({
            title: title,
            value: budget,
            color: color
        });
        await newBudget.save();
        res.send('Data Entered Successfully');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
