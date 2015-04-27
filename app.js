var app = angular.module('todoApp', []);

app.controller('MainCtrl', [
	'$scope',
	function ($scope) {
		$scope.test = 'MEAN Todo List';
		$scope.items = [
			{title:'item 1', done:false, createdOn: new Date()},
			{title:'item 2', done:true, createdOn: new Date()},
			{title:'item 3', done:false, createdOn: new Date()},
			{title:'item 4', done:false, createdOn: new Date()},
			{title:'item 5', done:false, createdOn: new Date()}
		];
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