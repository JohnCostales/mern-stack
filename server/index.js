// Libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Models
const profile = require("../backend/api/profile");
const userAuth = require("../backend/api/userAuth");
const blog = require("../backend/api/blogs");

const app = express();

app.get('/', (req, res) => res.send('test?'))

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/api/profile", profile);
app.use("/api/authentication", userAuth);
app.use("/api/blogs", blog);

// Database Configuration
const db = require("../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("../config/passport")(passport);
// Run on heroku or local port 3000
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));