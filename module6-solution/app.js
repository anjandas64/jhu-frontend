(function () {
  "use strict";

  angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    $scope.lunchItems = "";
    $scope.message = "";
    $scope.messageClass = "";
    $scope.inputClass = "";

    $scope.checkLunch = function () {
      $scope.message = "";
      $scope.messageClass = "";
      $scope.inputClass = "";

      if (!$scope.lunchItems || !$scope.lunchItems.trim()) {
        $scope.message = "Please enter data first";
        $scope.messageClass = "red";
        $scope.inputClass = "red-border";
        return;
      }

      var items = $scope.lunchItems
        .split(",")
        .map(function (item) {
          return item.trim();
        })
        .filter(function (item) {
          return item.length > 0;
        });

      if (items.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }

      $scope.messageClass = "green";
      $scope.inputClass = "green-border";
    };
  }
})();