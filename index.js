const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

app.use(cors());

const port = 5000

app.get('/', (req, res) => {
  res.send('Hey there!')
})

// console.log(process.env.DB_NAME);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mps7w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventsCollection = client.db("superheroNetwork").collection("events");
  // console.log(err);
});


app.listen(port);