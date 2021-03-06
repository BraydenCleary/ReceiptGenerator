var app = angular.module('receiptGenerator', [])
  .controller('receiptsController', ['$scope', '$http', function ($scope, $http) {
    $scope.createReceipts = function(){
      $http.post('/receipts', {receipt: this.receipt}).
        success(function(data){
        }).
        error(function(data, status){
        });
    }

    $scope.clearInputs = function(){
      this.receipt = {}
    }
  }]);

$(document).ready(function(){
  $('#receipt-datepicker').datepicker({
    multidate: true
  })
})

