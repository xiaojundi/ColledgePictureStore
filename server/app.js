
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, '../data/picture.json');
var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/mongoData'
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api', function(req, res) {

   MongoClient.connect(URL, function(err, db) {
  	if (err) return
  	var collection = db.collection('pictures')
	//collection.update({title: 'Chicken Marinara with Mushrooms'},{$set: {description:"Chicken"}})
    collection.find().toArray(function(err, docs){
    	res.send(docs);
   })
  });
});

app.get('/api/collections', function(req, res) {

   MongoClient.connect(URL, function(err, db) {
    if (err) return
    var collection = db.collection('collections')
    collection.find().toArray(function(err, docs){
   //   console.log(docs)
      res.send(docs);
   })
  });
});

app.post('/api/form', function(req, res){
	var inputData=req.body.userName+req.body.userPassword;
	MongoClient.connect(URL, function(err, db) {
  	if (err) return
  	var collection = db.collection('users')
	  //collection.update({title: 'Chicken Marinara with Mushrooms'},{$set: {description:"Chicken"}})
    collection.find().toArray(function(err, docs){
    	for(var i=0; i<docs.length; i++)
    	{
    		if(inputData==(docs[i].username+docs[i].password))
    		{
    			//res.send("successed");
          console.log(docs[i].username+docs[i].password)
    			res.send({username:docs[i].username, password:docs[i].password, redirect: '/'});
    			return;
    		}		
    	}
      console.log("failed")
    	res.send({redirect: '/'});
   })
  });
});

app.post('/api/favourit', function(req, res){
   var username=req.body.username;
   MongoClient.connect(URL, function(err, db) {
   if (err) return
   var collection = db.collection('collections')
   collection.find({"username": username}).toArray(function(err, docs){
      res.send(docs);
   })

 })
   //res.send({redirect: '/#/SignUp'});
   return;

});

app.post('/api/form/save', function(req, res){
  var getData={};
  getData.username=req.body.userName;
  getData.password=req.body.userPassword1;
  getData.email=req.body.email;
  
  console.log(getData)

   MongoClient.connect(URL, function(err, db) {
   if (err) return
   var collection = db.collection('users')
   if(getData.username.length>=4)
   if(getData.password.length>=6)
   if(getData.email.indexOf('@')!=-1)
   {
       collection.insertOne(getData);
       res.send({username:getData.username, password:getData.password, redirect: '/'});
       return;
   }
   res.send({redirect: '/#/SignUp'});

});



   // collection.update({title: 'Chicken Marinara with Mushrooms'},{$set: {description:"Chicken"}})
    // collection.find().toArray(function(err, docs){
    //     for(var i=0; i<docs.length; i++)
    //     {
    //       if(inputData==(docs[i].username+docs[i].password))
    //       {
    //         //res.send("successed");
    //         res.send({username:docs[i].username, password:docs[i].password, redirect: '/'});
    //         return;
    //       }   
    //     }
    //     console.log("failed")
    //     res.send({redirect: '/'});
    //  })
    // });
  

});

app.post('/api/modifyDb', function(req, res){
  var username=req.body.username;
  var display_src=req.body.address;
  var insertData={};
  insertData.username=username;
  insertData.display_src=display_src;
  if(req.body.like==0)
  {
         MongoClient.connect(URL, function(err, db) {
         if (err) return
         var collection = db.collection('collections')
             collection.insertOne(insertData);
             return;
         });
       //  MongoClient.close();
   }
   if(req.body.like==1)
   {
               MongoClient.connect(URL, function(err, db) {
               if (err) return
               var collection = db.collection('collections')
              // console.log(collection)
              // for(var i=0; i< collection.length; i++)
              // {
              //   if(collection[i].username==username)
              // }
              console.log("test....................")
              console.log(insertData)
                   collection.remove(insertData);
                   return;
               });
              
   }
     res.send({redirect: '/'});
});


function dataBaseConnect(){
  MongoClient.connect(URL, function(err, db) {
  if (err) return
  var collection = db.collection('pictures')

	collection.update({title: 'Chicken Marinara with Mushrooms'},{$set: {description:"Chicken"}})
    collection.find().toArray(function(err, docs){
    	//console.log(docs)
    	//db.close()
    	//return "asdf";
   })
    // collection.findOne({_id: 58da9527e1cf09decc9a8a43 },function(err, items){
    // 	console.log(items);
    // } )
  });
};



app.post('../data/picture', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

// MongoClient.connect(URL, function(err, db) {
//   if (err) return

//   var collection = db.collection('pictures')
//     collection.find().toArray(function(err, docs){
//     	console.log(docs[0]._id)
//     	db.close()
//     })
// });


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});