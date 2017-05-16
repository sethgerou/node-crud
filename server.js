console.log("node-crud starting up!");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://sethgerou:spinspin@ds143241.mlab.com:43241/seth-jokes-node', (err, database) => {
  if (err) console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('jokes').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)
  res.render('index.ejs', {jokes: result})
  // res.sendFile(__dirname + '/index.html')
  })
})

app.post('/jokes', (req, res) => {
  db.collection('jokes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)
    res.render('quotes.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/quotes')
  })
})
