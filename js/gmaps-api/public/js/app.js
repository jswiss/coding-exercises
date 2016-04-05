//app.js

//Declares teh initial angular module "meanMapApp". Module grabs other controllers and services. Note the use of ng-route
var app = angular.module('meanMapApp', ['addCtrl', 'geolocation', 'gservice', 'ngRoute'])

  //Congigures Angular routing -- showing the relevant view and controller when needed
  .config(['$routeProvider', function ($routeProvider) {
    
    // Join Team Control Panel
    $routeProvider.when('/join', {
      controller: 'addCtrl',
      templateUrl: 'partials/addForm.html'

      //Find teammates control panel
    }).when('/find', {
      templateUrl: 'partials/queryForm.html',

      //All else forward to the Join team control panel
    }).otherwise({ redirectTo: '/join' })
  }]);