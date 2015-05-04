'use strict'

var app = angular.module('todoApp', ['ngMaterial', 'ui.router', 'ngMdIcons']);

// configure ui-router angular plugin
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		'use strict';

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});

		$urlRouterProvider.otherwise('home'); // for unspecified routes

	}]);

// TodoItem Service
app.factory('TodoItemsService', [ '$http', function($http) {

	// TodoItem class
	function TodoItem(title, done, createdOn) {
		// Public properties
		this.title = title;
		this.done = done;
		this.createdOn = createdOn;
	}

	var serviceInstance = {
		items: [],

		list: function() {
			$http.get('/todos').success(function(data) {
				angular.copy(data, serviceInstance.items);
			});
			return serviceInstance.items;
		},
		addItem: function(title) {
			// don't add blanks
			if (title && title !== '') {			
				var item = new TodoItem(title, false, new Date());
				$http.post('/todos', item).success(function(data) {
					serviceInstance.items.push(data);
				}); // TODO: add a failure case
			}
		},
		saveItem: function(item) {
			$http.post('/todos/' + item._id + '/update', item).success(function(data) {
				// save succeeded
				angular.copy(data, item);
			}); // TODO: add a failure case
		},
		deleteItemByIndex: function(itemIndex) {
			var item = serviceInstance.items[itemIndex];
			$http.post('/todos/' + item._id + '/delete', item).success(function(data) {
				serviceInstance.items.splice(itemIndex,1);
			});
		}
	};
		

	return serviceInstance;
}]);

app.factory('Dialog', ['$mdDialog', function DialogFactory ($mdDialog) {
  return {
    open: function (url, ctrl, locals) {
      return $mdDialog.show({
        templateUrl: url,
        controller: ctrl,
        locals: {
          items: locals
        }
      });
    },
  }
}]);

app.controller('DialogCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
  $scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	  $mdDialog.hide();
	}
}])

// the main controller to modify the todo items
app.controller('MainCtrl', [
	'$scope',
	'TodoItemsService',
	'Dialog',
	function ($scope, TodoItemsService, Dialog) {
		$scope.test = 'Vic\'s MEAN Todo List';
		$scope.items = TodoItemsService.list();
		$scope.addItem = function() {
			// don't add blanks
			if ($scope.title && $scope.title !== '') {
				var ret = TodoItemsService.addItem($scope.title);
				$scope.title = ''; // clear it after, if added
			}
		};
		$scope.saveItem = TodoItemsService.saveItem;
		$scope.deleteItemByIndex = TodoItemsService.deleteItemByIndex;

		$scope.openDialog = function() {
			var url = '/templates/dialogTemplate.html',
			ctrl = 'DialogCtrl',
			locals = []
			Dialog.open(url, ctrl, locals);
		}
	}]);