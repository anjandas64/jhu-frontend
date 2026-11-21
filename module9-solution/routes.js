(function () {
    "use strict";
    angular.module('MenuApp')
    .config(RoutesConfig);
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html'
        })
        .state('categories', {
            url: '/categories',
            template: '<categories items="$resolve.categories"></categories>',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories()
                        .then(function (response) {
                            return response.data;
                        });
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            template: '<items items="$resolve.menuItems"></items>',
            resolve: {
                menuItems: ['$stateParams', 'MenuDataService',
                    function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory(
                            $stateParams.categoryShortName
                        ).then(function (response) {
                            return response.data.menu_items;
                        });
                    }
                ]
            }
        });
    }
})();