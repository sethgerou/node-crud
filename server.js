console.log("node-crud starting up!");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://sethgerou:spinspin@ds143241.mlab.com:43241/seth-jokes-node', (err, database) => {
  if (err) console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('jokes').find().toArray(function(err, results){
    console.log(results)
  })

  res.sendFile(__dirname + '/index.html')
})

app.post('/jokes', (req, res) => {
  db.collection('jokes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
