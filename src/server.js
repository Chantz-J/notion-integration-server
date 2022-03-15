const client_1 = require('@notionhq/client');
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

// const port = 8000;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Initializing the Notion client with secret
const notion = new client_1.Client({
    auth: notionSecret,
  });

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

// -----------------------------------------------------------

// ROUTES: 
const notionRouter = require('../api/notion/notion-router')

// API & AUTH ENDPOINTS 
app.use('/api/notion', notionRouter)



// SERVER 
app.get('/', (req, res) => {
  res.json('Welcome to the Notion Integration!');
});

app.get('/api', (req, res) => {
  res.json('access notion info through the api');
});



app.listen(process.env.PORT || 8080, () => console.log(`Notion Integration Server running...`))