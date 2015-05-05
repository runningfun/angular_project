'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngAnimate'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .factory('Cart', function () {
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
    })

    .controller('View3Ctrl', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {

        $scope.cart = Cart;

        $http.get('view3/articles.json').then(function (articlesResponse) {
            $scope.articles = articlesResponse.data;
        });

    }])


    .controller('CartCtrl', function ($scope, Cart) {
        $scope.cart = Cart;
    });