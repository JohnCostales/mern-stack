const express = require('express');
const mongoose = require('mongoose')

const users = require('../backend/api/users')
const userAuth = require('../backend/api/userAuth')
const thread = require('../backend/api/thread')

const app = express();

app.get('/', (req, res) => res.send('test?'))

// Use Routes
app.use('/api/users', users);
app.use('/api/authentication', userAuth);
app.use('/api/thread', thread);

// Database Configuration
const db = require('../config/keys').mongoURI

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Run on heroku or local port 3000
const port = process.env.port || 3000

app.listen(port, () => console.log(`Server running on port ${port}`))