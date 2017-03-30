var express = require('express');
var os = require("os");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var nav =   [{
    Link: '/Books', 
    Text:'Books'
 } ,{
    Link: '/Authors', 
    Text:"Authors"} ]; 
 
var bookRouter  = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);    
var authRouter = require('./src/routes/authRoutes')(nav);    
   
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set('views', './src/views');
 
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

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
    if(process.env.C9_HOSTNAME) {
        console.log("running server on Cloud9 -> https://" + process.env.C9_HOSTNAME + ":" + process.env.PORT);
    }
});

