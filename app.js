var app = angular.module('todoApp', ['ui.router']);


// configure ui-router angular plugin
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});

		$urlRouterProvider.otherwise('home'); // for unspecified routes

	}]);

// TodoItem Service
app.factory('TodoItemsService', [ function() {
	// TodoItem class
	function TodoItem(title, done, createdOn) {
		// Public properties
		this.title = title;
		this.done = done;
		this.createdOn = createdOn;
		this.id = TodoItem.lastId++;
	}
	TodoItem.lastId = 0;

	var serviceInstance = {
		items: [ 
			new TodoItem('take out the garbage', false, new Date()),
			new TodoItem('clean garage', false, new Date())
		],
		list: function() {
			return serviceInstance.items;
		},
		addItem: function(title) {
			// don't add blanks
			if (title && title !== '') {
				serviceInstance.items.push(new TodoItem(title, false, new Date()));
				return true; // added
			} else {
				return false; // didn't add
			}
		},
		saveItem: function(item) {
			// TODO: update DB
			//serviceInstance.items[serviceInstance.items.indexOf(item)].title;
		},
		deleteItemByIndex: function(itemIndex) {
			serviceInstance.items.splice(itemIndex, 1);
		},
		toggleItem: function(item) {
			item.done = !item.done;
		}	
	};
		

	return serviceInstance;
}]);

// the main controller to modify the todo items
app.controller('MainCtrl', [
	'$scope',
	'TodoItemsService',

	function ($scope, TodoItemsService) {

				$scope.test = 'Vic\'s MEAN Todo List';
		$scope.items = TodoItemsService.list();
		$scope.addItem = function() {
			// don't add blanks
			if ($scope.title && $scope.title !== '') {
				if (TodoItemsService.addItem($scope.title)) {
					$scope.title = ''; // clear it after, if added
				}
			}
		};
		$scope.toggleItem = TodoItemsService.toggleItem;
		$scope.saveItem = TodoItemsService.saveItem;
		$scope.deleteItemByIndex = TodoItemsService.deleteItemByIndex;
	}]);