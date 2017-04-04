var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mongoData'

MongoClient.connect(URL, function(err, db) {
  if (err) return

  var collection = db.collection('pictures')
  // collection.insert({name: 'taco', tasty: true}, function(err, result) {
  //   collection.find({name: 'taco'}).toArray(function(err, docs) {
  //     console.log(docs[0])
  //     db.close()
  //   })
  // })
    collection.find().toArray(function(err, docs){
    	console.log(docs[0]._id)
    	db.close()
    })
})

// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'localhost');

// var express = require('express'),
//     MongoClient = require('mongodb').MongoClient,
//     app = express(),
//     mongoUrl = 'mongodb://localhost:27017/textmonkey';

// var access = require('./access.js');

// MongoClient.connect(mongoUrl, function (err, db) {
//     if (err) throw 'Error connecting to database - ' + err;

//     app.post('/book', function (req, res) {
//         if (!req.body.title || !req.body.author) res.status(400).send("Please send a title and an author for the book");
//         else if (!req.body.text) res.status(400).send("Please send some text for the book");
//         else {
//             access.saveBook(db, req.body.title, req.body.author, req.body.text, function (err) {
//                 if (err) res.status(500).send("Server error");
//                 else res.status(201).send("Saved");
//             });
//         }
//     });

//     app.get('/book/:title', function (req, res) {
//         if (!req.param('title')) res.status(400).send("Please send a proper title");
//         else {
//             access.findBookByTitle(db, req.param('title'), function (book) {
//                 if (!text) res.status(500).send("Server error");
//                 else res.status(200).send(book);
//             });
//         }
//     });

//     app.listen(8000, function () {
//         console.log('Listening on port 8000');
//     });
// });

// module.exports.findBookByTitleCached = function (db, redis, title, callback) {
//     redis.get(title, function (err, reply) {
//         if (err) callback(null);
//         else if (reply) //Book exists in cache
//         callback(JSON.parse(reply));
//         else {
//             //Book doesn't exist in cache - we need to query the main database
//             db.collection('text').findOne({
//                 title: title
//             }, function (err, doc) {
//                 if (err || !doc) callback(null);
//                 else {\\Book found in database, save to cache and
//                     return to client
//                     redis.set(title, JSON.stringify(doc), function () {
//                         callback(doc);
//                     });
//                 }
//             });
//         }
//     });
// };

// app.get('/book/:title', function (req, res) {
//     if (!req.param('title')) res.status(400).send("Please send a proper title");
//     else {
//         access.findBookByTitleCached(db, redis, req.param('title'), function (book) {
//             if (!text) res.status(500).send("Server error");
//             else res.status(200).send(book);
//         });
//     }
// });