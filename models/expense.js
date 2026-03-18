const mongoose = require('mongoose')

// Blueprint for each expense
const Expense = mongoose.model('Expense', {
    amount: Number,       // money spent
    category: String,     // e.g., food, travel
    description: String,  // optional text
    date: Date            // when the expense happened
})

module.exports = Expense