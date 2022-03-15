require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(express.json());

const corsOptions ={
  origin: ['https://recharge-notion-client.netlify.app', 'http://localhost:3000'],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// -----------------------------------------------------------

// ROUTES: 
const notionRouter = require('./notion/notion-router');

// API & AUTH ENDPOINTS 
app.use('/api/notion', notionRouter)



// SERVER 
app.get('/', (req, res) => {
  res.json('Welcome to the Notion Integration!');
});

app.get('/api', (req, res) => {
  res.json('access notion info through the api');
});

module.exports = app;