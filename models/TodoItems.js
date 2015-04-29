var mongoose = require('mongoose');

var TodoItemSchema = new mongoose.Schema({
	title: String,
	done: { type: Boolean, default: false },
	createdOn: { type: Date, default: new Date() }
});

mongoose.model('TodoItem', TodoItemSchema);