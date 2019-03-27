const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('test?'))

// Run on heroku or local port 3000
const port = process.env.port || 3000

app.listen(port,() => console.log(`Server running on port ${port}`))