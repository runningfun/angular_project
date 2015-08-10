'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'ngResource']);

view1.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'RestCtrlMongo'
  });
}]);

view1.factory('GasMongo', ['$resource',
  function ($resource) {
    return $resource('http://localhost:8084/RestfulService/webapi/energycounter/gasfrommongo', {}, {
      query: {method: 'GET', isArray:true}
    });
  }]);

view1.controller('RestCtrlMongo', ['$scope', 'GasMongo', function ($scope, GasMongo) {

  $scope.gasmongo = GasMongo.query();

}]);