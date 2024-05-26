const express = require("express");
const connectDB = require('./db'); // import the database connection module
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const checkNumbers = (num1, num2) => {
    if (isNaN(num1))
        throw new Error("Invalid number num1");
    if (isNaN(num2))
        throw new Error("Invalid number num2");
}

const calculate = (num1, num2, operation) => {
    let result;
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 === 0)
                throw new Error("Division by zero is not allowed");
            result = num1 / num2;
            break;
        case "exponential":
            result = Math.pow(num1, num2);
            break;
        case "squareRoot":
            if (num1 < 0)
                throw new Error("Square root of a negative number is not allowed");
            result = Math.sqrt(num1);
            break;
        case "modulo":
            result = num1 % num2;
            break;
        default:
            throw new Error("Invalid operation");
    }
    return result;
}

// Create calculation history in MongoDB
const createHistory = async (operation, num1, num2, result) => {
    const db = await connectDB();
    const collection = db.collection('calculation_history');
    const record = {
        operation,
        num1,
        num2,
        result,
        createdAt: new Date()
    };
    await collection.insertOne(record);
};

// Read calculation history from MongoDB
app.get('/history', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('calculation_history');
        const history = await collection.find().toArray();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Update a calculation history record in MongoDB
app.put('/history/:id', async (req, res) => {
    const { id } = req.params;
    const { operation, num1, num2, result } = req.body;

    try {
        const db = await connectDB();
        const collection = db.collection('calculation_history');
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { operation, num1, num2, result } });
        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Delete a calculation history record from MongoDB
app.delete('/history/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await connectDB();
        const collection = db.collection('calculation_history');
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Calculation endpoints
const operations = ["add", "subtract", "multiply", "divide", "exponential", "squareRoot", "modulo"];
operations.forEach(operation => {
    app.get(`/${operation}`, async (req, res) => {
        try {
            const num1 = parseFloat(req.query.num1);
            const num2 = parseFloat(req.query.num2);

            checkNumbers(num1, num2);

            const result = calculate(num1, num2, operation);
            await createHistory(operation, num1, num2, result);
            res.json(`Parameters ${num1} and ${num2} received for operation -> ${operation}: And the result is ${result}`);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });
});

const port = 3040;
app.listen(port, () => {
    console.log("Listening to port " + port);
});
