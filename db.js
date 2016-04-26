var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,
    title      : String,
    content    : String,
    state      : String,
    updated_at : Date
});

mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/todo' );
