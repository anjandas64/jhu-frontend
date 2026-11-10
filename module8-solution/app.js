(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        narrow.searchTerm = '';
        narrow.found = [];
        narrow.hasSearched = false;
        narrow.narrowItDown = function () {
            narrow.found = [];
            narrow.hasSearched = true;
            if (!narrow.searchTerm || narrow.searchTerm.trim() === '') {
                return;
            }
            MenuSearchService.getMatchedMenuItems(
                narrow.searchTerm
            ).then(function (foundItems) {
                narrow.found = foundItems;
            });
        };
        narrow.removeItem = function (index) {
            narrow.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        this.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
            }).then(function (result) {
                var foundItems = [];
                var data = result.data;
                var search = searchTerm.toLowerCase();
                angular.forEach(data, function (category) {
                    angular.forEach(category.menu_items, function (item) {
                        if (item.description &&
                            item.description.toLowerCase().indexOf(search) !== -1) {
                            foundItems.push(item);
                        }
                    });
                });
                return foundItems;
            });
        };
    }

    function FoundItems() {
        return {
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            template:
                '<div style="clear: both;"></div>' +
                '<ul style="display: block; clear: both;">' +
                    '<li ng-repeat="item in foundItems">' +
                        '{{ item.name }}, ' +
                        '{{ item.short_name }}, ' +
                        '{{ item.description }} ' +
                        '<button ng-click="onRemove({index: $index})">' +
                            'Don\'t want this one!' +
                        '</button>' +
                    '</li>' +
                '</ul>'
        };
    }
})();