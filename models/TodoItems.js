var mongoose = require('mongoose');

var TodoItemSchema = new mongoose.Schema({
	title: String,
	done: Boolean,
	createdOn: Date
});

mongoose.model('TodoItem', TodoItemSchema);