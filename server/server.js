const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config({ path: './config.env' });



const app = express();

app.use(express.json());
app.use(cors());

const DB = process.env.DATABASE_LOCAL;
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

const todoSchema = new mongoose.Schema({
    title: String,
    details: String,
    date: Date,
    completed: Boolean
})

const Todo = mongoose.model('Todo', todoSchema);

// const testTodo = new Todo({
//     title: 'title4',
//     details: 'details4',
//     date: '2021-1-4', 
//     completed: false
// });

// testTodo.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log(err);
// })

app.get('/todos', async (req, res) => {
    // res.send("Hello from Erkhes");
    // console.log(req.params);
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

app.post('/todos', async (req, res) => {
    try {
        // console.log(req);
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo)
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

app.patch('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Todo deleted successfully!"});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})
