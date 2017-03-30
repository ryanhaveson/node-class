var express = require('express');
var adminRouter = express.Router()
var mongodb = require('mongodb').MongoClient;


var books = [ 
        {
            title: 'War and piece',
            genre: 'Historical Fiction',
            author: 'Lev Nik',
            read: false
        },
    
        {
            title: 'Other war and peace',
            genre: 'Historical non fyiction',
            author: 'Leventon',
            read: true
        },
    
        {
            title: 'War and piece of paper',
            genre: 'non fiction',
            author: 'Angular den',
            read: false
        },
        {
            title: 'The intracicies of code',
            genre: 'coding non fiction',
            author: 'beasti boi',
            read: false
        },
        {
            title: 'so much typing!',
            genre: 'neough already',
            author: 'my name  ',
            read: true
        }
    ];

var router = function(nav){
    
    adminRouter.route('/addBooks')
    .get(function(req, res) {
        
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db){ 
            console.log(err);
            res.send("Connected to Mongo");
            db.close();
        });
        /*
        
        mongodb.connect(url, function(err, db){
            if(err != null ){
                console.log("Looks like we connected to mongodb");
                //var collection = db.collection('books');
                
                if(collection === null) {
                    console.log("I think we have a null collection");
                } else {
                    console.log("About to insert");
                    collection.insertMany(books, function(err, results) {
                        if(err) { console.log(err) } else {
                            console.log(results);
                        }
                        db.close(); 
                    });
                }
                
            } else {
                console.log(err);
            }
            db.close(); 
        });
        */
        //res.send('Hello admin router');

    });
    return adminRouter;
    
}

module.exports = router; 

