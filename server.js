// use express as the server package
const express = require('express');
// use mongoose as the ODM for Mongo db
const mongoose = require('mongoose');
const routes = require('./routes');

// define app as the server vaqriable and the PORT variable
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse information for the db
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// define the db connection 
mongoose.connect(process.env.MONGODB_URI || 
  'mongodb://localhost/social-network', {});

// log mongo queries being executed!
mongoose.set('debug', true);

// turn on routes
app.use(routes);

// turn on the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
