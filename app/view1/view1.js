'use strict';

var view1 = angular.module('myApp.gas', ['ngRoute', 'ngAnimate', 'ngResource']);

view1.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/gas', {
    templateUrl: 'view1/view1.html',
    controller: 'GasController'
  });
}]);

view1.factory('getGas', ['$resource',
  function ($resource) {
    return $resource('http://localhost:8084/RestfulService/webapi/energycounter/gasfrommongo', {}, {
      query: {method: 'GET', isArray:true}
    });
  }]);

view1.factory('setGas', ['$resource',
    function ($resource) {
        return $resource('http://localhost:8084/RestfulService/webapi/energycounter/gas', {}, {
            save: {method: 'POST'}
        });
    }]);

view1.factory('deleteGas', ['$resource',
    function ($resource) {
        return $resource('http://localhost:8084/RestfulService/webapi/energycounter/gas/:deleteDate', {deleteDate:'@deleteDate'}, {
            remove: {method: 'DELETE'}
        });
    }]);

view1.controller('GasController', ['$scope', 'getGas', 'deleteGas', function ($scope, getGas, deleteGas) {

  $scope.getGas = getGas.query();

  $scope.removeRow=function(date, value, id){
      var deleteDate;
      console.log("remove row for "+date)
      var index=-1;
      var comArr = eval( $scope.getGas );
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
      $scope.getGas.splice( index, 1 );
  };

}]);



view1.controller('SubmitController', ['$scope','setGas', function($scope, setGas) {

    $scope.meterReadingDate='Ablesedatum';
    $scope.meterReadingValue='Zaehler Stand';
    $scope.commitMeter=function(){
      console.log("Ablesedatum "+$scope.meterReadingDate);
      console.log("Zaehler Stand "+$scope.meterReadingValue);
        var gasEneryValue={meterReadingDate:$scope.meterReadingDate, meterReadingValue:$scope.meterReadingValue};
        console.log("gasEnergyValue "+gasEneryValue);
        $scope.setGas = setGas.save(gasEneryValue);
    }

}]);