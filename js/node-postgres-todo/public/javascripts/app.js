angular.module('nodeTodo', [])
  .controller('mainController', function($scope, $http) {

    //Define $scope to handle data binding
    $scope.formData = {};
    $scope.todoData = {};

    //Get all todos
    $http.get('/apiv1/todos')
      .success(function(data) {
        $scope.todoData = data;
        console.log("Data: ", data);
      })
      .error(function(error) {
        console.log("Error: ", error);
      });
  });