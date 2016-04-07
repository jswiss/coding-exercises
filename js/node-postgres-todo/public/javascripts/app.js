angular.module('nodeTodo', [])
  .controller('mainController', function($scope, $http) {

    //Define $scope to handle data binding
    $scope.formData = {};
    $scope.todoData = {};

    //Get all todos
    $http.get('/api/v1/todos')
      .success(function(data) {
        $scope.todoData = data;
        console.log("Get data: ", data);
      })
      .error(function(error) {
        console.log("Error: ", error);
      });

    $http.post('/api/v1/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.todoData = data;
        console.log("Post data: ", data);
      })
      .error(function(error) {
        console.log("Post error: ", error);
      });

      $http.delete('/api/v1/todos' + todoID)
        .success(function(data) {
          $scope.todoData = data;
          console.log("Delete data: ", data);
        })
        .error(function(error) {
          console.log("Delete error: ", error)
        });
  });