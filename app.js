var app = angular.module('todoApp', ['ui.router']);

/*
// configure ui-router angular plugin
app.config([
	'$stateProvider',
	'$urlRouteProvider',
	function ($stateProvider, $urlRouteProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controiller: 'MainCtrl'
		});

		$urlRouteProvider.otherwise('home'); // for unspecified routes

	}]);
*/

// create a factory for our todo items
app.factory('items', [function() {
	var o = {
		items: [
		{title:'item 1', done:false, createdOn: new Date()},
		{title:'item 2', done:true, createdOn: new Date()},
		{title:'item 3', done:false, createdOn: new Date()},
		{title:'item 4', done:false, createdOn: new Date()},
		{title:'item 5', done:false, createdOn: new Date()}
		]
	};
	return o;
}]);

// the main controller to modify the todo items
app.controller('MainCtrl', [
	'$scope',
	'items',
	function ($scope, items) {
		$scope.test = 'Vic\'s MEAN Todo List';
		$scope.items = items.items;
		$scope.addItem = function() {
			// don't add blanks
			if ($scope.title && $scope.title !== '') {
				$scope.items.push({title:$scope.title, done:false, createdOn: new Date()});
				$scope.title = ''; // clear it after
			}
		};
		$scope.doneItem = function(index) {
			$scope.items[index].done = true;
		};
		$scope.removeItem = function(index) {
			$scope.items.splice(index, 1);
		};
		$scope.undoneItem = function(index) {
			$scope.items[index].done = false;
		};
		$scope.editItem = function(index) {
			$scope.items[index].title = item.title;
		};
	}]);

