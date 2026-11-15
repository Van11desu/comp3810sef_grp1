require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/db');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello! The Library Server is running.</h1>');
});

async function startServer() {
    await connectDB();
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
}

startServer();
