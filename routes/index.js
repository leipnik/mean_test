var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var TodoItem = mongoose.model('TodoItem');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// list todo items
router.get('/todos', function(req, res, next) {
  TodoItem.find(function(err, todoItems){
  	if(err) {	return next(err); }

  	res.json(todoItems);
  });
});
// new todo item
router.post('/todos', function(req, res, next) {
	var todoItem = new TodoItem(req.body);

	todoItem.save(function(err, todoItem) {
		if (err) { return next(err); }

		res.json(todoItem);
	})
});
// todo item route parameter
router.param('todo', function(req, res, next, id) {
	var query = TodoItem.findById(id);

	query.exec(function(err, todoItem) {
		if (err) { return next(err); }
		if (!todoItem) { return next(new Error('can\'t find post with id ' + id)); }

		req.todoItem = todoItem;
		return next();
	});
});
// todo item update (only title and done, not createdOn)
router.post('/todos/:todo/update', function(req, res) {
	var todoItem = new TodoItem(req.body);
	req.todoItem.title = todoItem.title;
	req.todoItem.done = todoItem.done;
	req.todoItem.save(function(err, todoItem) {
		if(err) { return next(err); }
		res.json(todoItem);
	});
})
// todo item update
router.post('/todos/:todo/delete', function(req, res) {
	var todoItem = new TodoItem(req.body);
	TodoItem.findById(todoItem.id).remove().exec();
	res.end();
})
// todo item lookup
router.get('/todos/:todo', function(req, res) {
	res.json(req.todoItem);
})

module.exports = router;
