'use strict';

var view3 = angular.module('myApp.view3', ['ngRoute', 'ngAnimate', 'ngResource']);

view3.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
}]);

view3.factory('Gas', ['$resource',
    function ($resource) {
        return $resource('http://localhost:8084/RestfulService/webapi/energycounter/gas', {}, {
            query: {method: 'GET'}
        });
    }]);

view3.controller('RestCtrl', ['$scope', 'Gas', function ($scope, Gas) {

    $scope.gas = Gas.query();

}]);

view3.factory('Cart', function () {
        var items = [];
        return {
            getItems: function () {
                return items;
            },
            addArticle: function (article) {
                items.push(article);
            },
            sum: function () {
                return items.reduce(function (total, article) {
                    return total + article.price;
                }, 0);
            }
        };
});

view3.controller('View3Ctrl', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {

        $scope.cart = Cart;

        $http.get('view3/articles.json').then(function (articlesResponse) {
            $scope.articles = articlesResponse.data;
        });

}]);


view3.controller('CartCtrl', function ($scope, Cart) {
        $scope.cart = Cart;
    });