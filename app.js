var express = require('express');
var os = require("os");

var app = express();

var nav =   [{
    Link: '/Books', 
    Text:'Books'
 } ,{
    Link: '/Authors', 
    Text:"Authors"} ]; 
 
var bookRouter  = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);    
   
app.use(express.static('public'));
app.set('views', './src/views');
 
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.render('index', {title: '  hello from render', 
                         nav:nav
                        }
                );
});
  
app.get('/books', function(req, res) {
    res.send('Hello books');
});

var port = process.env.PORT | 3000;
app.listen(port, function(err) {
   // console.log("running server on Cloud9 -> https://" + process.env.C9_HOSTNAME + ":" + process.env.PORT);
});

