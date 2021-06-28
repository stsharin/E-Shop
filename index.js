const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


app.use(cors());
app.use(express.json());

const port = 5000;

// console.log(process.env.DB_NAME);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mps7w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventsCollection = client.db("superheroNetwork").collection("events");
  // console.log(err);

  app.get('/events', (req, res) => {
    eventsCollection.find({})
    .toArray((err, documents) => {
      // console.log(documents);
      res.send(documents);
    })
  })

  app.get('/events/:id', (req, res) => {
    const id = req.params.id;
    eventsCollection.find({_id: ObjectId(id)})
    .toArray((err, documents) => {
      // console.log(documents);
      res.send(documents[0]);
    })
  })

    // will use later
  // app.post('/addEvents', (req, res) => {
  //   const events = req.body;
  //   // console.log(events);
  //   eventsCollection.insertMany(events, (err, result) => {
  //     // console.log(err, result);
  //     res.send({count: result});
  //   })
  // })

  // For testing
  // app.get('/addEvents', (req, res) => {
  //   eventsCollection.insertMany([{name: 'zzz'}, {name: 'aaa'}], (err, result) => {
  //     console.log(err, result);
  //   })
  // })

  app.get('/', (req, res) => {
    res.send('Hey there!')
  })

});


app.listen(port);