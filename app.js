//jshint esversion:6

require( './db' );

const express = require( 'express' );
const http = require( 'http' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const logger = require( 'morgan' );
const errorHandler = require( 'errorhandler' );
const static = require( 'serve-static' );
const routes= require( './routes' );
const mongoose = require( 'mongoose' );

const Todo = mongoose.model( 'Todo' );
const app = express();


// all environments configuration
app.set( 'port', process.env.PORT || 3001 );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'jade' );
app.use( favicon( __dirname + '/public/favicon.ico' ));
app.use( logger( 'dev' ));
app.use( methodOverride());
app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended : true }));


//GET all todos
app.get('/api/todos/all', routes.all);

// Routes
app.use(routes.currentUser );
app.get('/', (req, res, next) => res.render('index', {title: 'Remember Me'}));
app.post('/api/create', routes.create );
app.delete('/api/delete/:id', routes.delete);
app.get('/edit/:id', routes.edit );
app.post('/update/:id',routes.update );
app.post('/api/state/:id', routes.switchState);

app.use(static( path.join( __dirname, 'public' )));

// development only
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}

http.createServer(app).listen( app.get( 'port' ), () => {
  console.log( 'Express server listening on port ' + app.get( 'port' ));
  logger('https://localhost:'+ app.get('port'));
  
});
