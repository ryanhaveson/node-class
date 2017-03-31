var express = require('express');
var adminRouter = express.Router()
var mongodb = require('mongodb').MongoClient;


var oldBooks = [ 
        {
            title: 'War and piece',
            genre: 'Historical Fiction',
            author: 'Lev Nik',
            bookId: 656,
            read: false
        },
    
        {
            title: 'Les Miz',
            genre: 'Historical non fyiction',
            author: 'Leventon',
            bookId : 24280,
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
            console.log("Looks like we connected to mongodb");
            var collection = db.collection('books');

            if(collection === null) {
                console.log("I think we have a null collection");
            } else {
                console.log("About to insert");
                collection.insertMany(oldBooks, function(err, results) {
                    if(err) { console.log(err) } else {
                        console.log(results);
                    }
                    res.send(results);
                    db.close(); 
                });
            }
            db.close(); 
        });

    });
    return adminRouter;
    
}

module.exports = router; 

