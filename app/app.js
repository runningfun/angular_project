'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.gas',
  'myApp.temperature',
  'myApp.view3',
  'myApp.version'
])

    .config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/temperature'});
}]);
