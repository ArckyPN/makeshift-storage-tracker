// imports
const express = require('express');
const cors = require('cors');
const fs = require("fs");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes prefix
app.use('/api', require('./routes/routes'));

// start server
app.listen(port, () => console.log(`Server has started at http://localhost:${port}`));
