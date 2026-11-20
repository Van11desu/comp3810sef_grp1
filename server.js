require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/db');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// REST API (Person 3). It reads the logged-in user from req.session, so the
// express-session middleware must be mounted ABOVE this line. The API parses
// its own JSON bodies (see routes/api/index.js) so that even a broken body gets
// a JSON error answer instead of an HTML stack trace.
app.use('/api', apiRoutes);

// JSON bodies for the page routes; the API already parsed its own above.
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello! The Library Server is running.</h1>');
});

async function startServer() {
    await connectDB();
    app.listen(port, () => {
        console.log('🚀 Server running at http://localhost:' + port);
    });
}
startServer();
