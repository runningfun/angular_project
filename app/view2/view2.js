'use strict';

var view2 = angular.module('myApp.temperature', ['ngRoute', 'ngAnimate', 'ngResource']);

view2.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/temperature', {
    templateUrl: 'view2/view2.html',
    controller: 'TemperatureController'
  });
}])

view2.factory('getTemperature', ['$resource',
  function ($resource) {
    return $resource('http://localhost:8084/RestfulService/webapi/dhtservice/temperature/50', {}, {
      query: {method: 'GET', isArray:true}
    });
  }]);

view2.factory('deleteTemperature', ['$resource',
  function ($resource) {
    return $resource('http://localhost:8084/RestfulService/webapi/dhtservice/temperature/:deleteDate', {deleteDate:'@deleteDate'}, {
      remove: {method: 'DELETE'}
    });
  }]);

view2.controller('TemperatureController', ['$scope', 'getTemperature', 'deleteTemperature', function ($scope, getTemperature, deleteTemperature) {

  $scope.getTemperature = getTemperature.query();

  $scope.removeRow=function(date, value, id){
    var deleteDate;
    console.log("remove row for "+date)
    var index=-1;
    var comArr = eval( $scope.getTemperature );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].date === date && comArr[i].value === value && comArr[i]._id === id) {
        index = i;
        deleteDate=date;
        break;
      }
    }
    if( index === -1 ) {
      alert( "Something gone wrong" );
    }
    console.log("remove id from mongo "+deleteDate)
    deleteGas.remove({deleteDate:deleteDate});
    $scope.getTemperature.splice( index, 1 );
  };

}]);

view2.filter('datefilter', function($filter)
{
  return function(input)
  {
    if(input == null){ return ""; }

    var _date = $filter('date')(new Date(input), 'yyyy-MM-dd HH:mm:ss');

    return _date.toUpperCase();

  };
});
