
(function () {
  "use strict";

  angular.module("ShoppingListCheckOff", [])
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService)
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .filter("angularDollars", angularDollars);

  ShoppingListCheckOffService.$inject = [];

  function ShoppingListCheckOffService() {
    var service = this;
    service.toBuyItems = [
      { name: "cookies", quantity: 10, pricePerItem: 2 },
      { name: "milk", quantity: 2, pricePerItem: 2.50 },
      { name: "bread", quantity: 1, pricePerItem: 5 },
      { name: "apples", quantity: 6, pricePerItem: 1 },
      { name: "eggs", quantity: 12, pricePerItem: 0.25 }
    ];
    service.boughtItems = [];
    service.buyItem = function (index) {
      var item = service.toBuyItems[index];
      if (!item) {
        return;
      }
      service.boughtItems.push(item);
      service.toBuyItems.splice(index, 1);
    };
  }

  ToBuyController.$inject = ["ShoppingListCheckOffService"];

  function ToBuyController(ShoppingListCheckOffService) {
    var vm = this;
    vm.items = ShoppingListCheckOffService.toBuyItems;
    vm.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var vm = this;
    vm.items = ShoppingListCheckOffService.boughtItems;
  }

  function angularDollars() {
    return function (input) {
      var amount = Number(input);
      if (!isFinite(amount)) {
        amount = 0;
      }
      return "$$$" + amount.toFixed(2);
    };
  }
})();