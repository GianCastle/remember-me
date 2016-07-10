
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
const app = express();
const routes= require( './routes' );
const mongoose = require( 'mongoose' );
const Todo = mongoose.model( 'Todo' );


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
app.get('/api/todos/all', (req, res, next) => {
  Todo.find({
    user_id: req.cookies.user_id,
  }).sort('-updated_at')
    .exec((err, todos) => (err) ? next(err) : res.json(todos))
});

//GET todo tasks
app.get('/api/todos/red', (req, res, next) => {
  Todo.find({
    user_id: req.cookies.user_id,
    state: 'red'
  }).sort('-updated_at')
      .exec((err, todos) => (err) ? next(err) : res.json(todos));
});

//GET todo in progress
app.get('/api/todos/blue', (req, res, next) => {
  Todo.find({
    user_id: req.cookies.user_id,
    state: 'blue'
  }).sort('-updated-at')
      .exec((err, todos) => (err) ? next(err) : res.json(todos));
});

//GET todo done
app.get('/api/todos/green', (req, res, next) => {
  Todo.find({
    user_id: req.cookies.user_id,
    state: 'green'
  }).sort('-update-at')
      .exec((err, todos) => (err) ? next(err) : res.json(todos)
  );
});

// Routes
app.use(routes.currentUser );
app.get('/', routes.index );
app.post('/create', routes.create );
app.delete('/destroy/:id', routes.destroy );
app.get('/edit/:id', routes.edit );
app.post('/update/:id',routes.update );
app.get('/switch/:id', routes.switchState);

app.use( static( path.join( __dirname, 'public' )));

// development only
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
  logger('https://localhost:'+ app.get('port'));
});
