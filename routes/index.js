//jshint esversion: 6

const utils = require( '../utils' );
const mongoose = require( 'mongoose' );
const Todo = mongoose.model( 'Todo' );


exports.all = (req, res, next) => {
  Todo.find({
    user_id: req.cookies.user_id
  }).sort('-updated_at')
    .exec((err, todos) => (err) ? next(err) : res.json(todos))
  
};
exports.create =  (req, res, next) => {
 const todo = new Todo ({

      user_id    : req.cookies.user_id,
      title      : (req.body.title)   ? req.body.title   : "NO TITLE",
      content    : (req.body.content) ? req.body.content : "NO CONTENT",
      state      : 'red',
      end_date   : req.body.end_date,
      updated_at : Date.now()

  })
   todo.save(( err, todo, count ) => {
    if( err )
      return next(err);

    Todo.find((err, todos) => {
      if(err)
        return next(err);

      res.json(todos);

    });
  });
};
exports.delete = function ( req, res, next ) {

  Todo.findById(req.params.id, function (err, todo) {
    const user_id = req.cookies ? req.cookies.user_id : undefined;

    if (todo.user_id !== user_id) {
      return utils.forbidden(res);
    }

    todo.remove(function (err, todo) {
      if (err) return next(err);

      Todo.find((err, todos) => {
        if (err)
          return next(err);

        res.json(todos);
      });
    });
  });
};

//TODO EDIT
exports.edit = function( req, res, next ){
  let user_id = req.cookies ?
      req.cookies.user_id : undefined;

  Todo.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec((err, todos ) => {
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Remember Me',
        todos   : todos,
        current : req.params.id
      });
    });
};
exports.update = function( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
    let user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== user_id ){
      return utils.forbidden( res );
    }
    todo.title  = req.body.title;
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) return next( err );
      res.redirect( '/' );
    });
  });
};

exports.switchState = function(req, res, next) {
  Todo.findById( req.params.id, function(err, todo) {
    const user_id = req.cookies ? req.cookies.user_id : undefined;
    
    if(todo.user_id !== user_id) {
      return utils.forbidden(res);
    }

    switch (todo.state) {
      case 'red'  : todo.state = 'blue';  break;
      case 'blue' : todo.state = 'green'; break;
    }

    todo.save(function(err, todo, count){
      if(err) return next(err);

      Todo.find((err, todos) => {
        if(err)
          return next(err);

        res.json(todos);
    
      });
    });
  });

};
exports.currentUser = function ( req, res, next ){
  let user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
