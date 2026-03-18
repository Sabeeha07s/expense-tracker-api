
console.log("SERVER FILE RUNNING")
const express = require('express')
const mongoose = require('mongoose')
const Expense = require('./models/expense')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/expense-db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err))


app.get('/', (req, res) => {
    res.send('Hello sabee')
})
app.post('/expenses', async (req, res) => {
    try {
        const expense = new Expense(req.body)
        await expense.save()
        res.send(expense)
    } catch (err) {
        res.status(400).send(err)
    }
}) 
app.get('/expenses', async (req, res) => {
    console.log("GET /expenses hit")
    try {
        const expenses = await Expense.find()
        res.send(expenses)
    } catch (err) {
        res.status(500).send(err)
    }
})
app.delete('/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id

        console.log("DELETE ID:", id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format")
        }

        const expense = await Expense.findByIdAndDelete(id)

        if (!expense) {
            return res.status(404).send("Expense not found")
        }

        res.send("Deleted successfully")
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
})
app.put('/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format")
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // returns updated data
        )

        if (!updatedExpense) {
            return res.status(404).send("Expense not found")
        }

        res.send(updatedExpense)
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})