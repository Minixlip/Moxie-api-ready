require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./routes/Product');

// PORT

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// express app

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// cors
app.use(cors());

// routes
app.use('/api/product', productRoutes);

mongoose
  .connect(mongoURI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('Connected to DB & listening on port:', port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
