const mongoose = require('mongoose');

// Define schema for Budget
const budgetSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    },
    value: { 
        type: Number, 
        required: [true, 'Value is required'] 
    },
    color: { 
        type: String, 
        required: [true, 'Color is required'], 
        validate: {
            validator: function(v) {
                return /^#([0-9A-F]{6})$/i.test(v); // HEX color validation
            },
            message: props => `${props.value} is not a valid HEX color!`
        }
    }
});

module.exports = mongoose.model('Budget', budgetSchema);
