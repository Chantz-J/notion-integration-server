// CONFIGURATIONS SO EXPRESS IS HAPPY ( import and initialize neccesary modules and routes )
require("dotenv").config(); // our environment variables to be accessible while running locally
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const secret = process.env.SECRET;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const corsOptions ={
  origin: ['https://recharge-notion-client.netlify.app', 'http://localhost:3000'],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// -----------------------------------------------------------

// ROUTES: 
const notionRouter = require('./notion/notion-router');

// API & AUTH ENDPOINTS (ROUTE MOUNTS)
app.use('/api/notion', notionRouter);



// SERVER 
app.get('/', (req, res) => {
  res.json('Welcome to the Notion Integration!');
});

app.get('/api', (req, res) => {
  res.json('access notion info through the api');
});

module.exports = app;