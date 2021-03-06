var notepad = angular.module('notepad', []);  //'ngRoute'


//first time page opens should GET all notes
  //Change to be a button to refresh later.
// function mainController($scope, $http) {
notepad.controller('mainController', ['$scope', '$http', function($scope, $http) {

  //post request to server.
    //pass the inputted text (as json?)
  $scope.textToPost = {};

  $scope.addNote = function() {
    $http.post('/note', $scope.textToPost).then(function(response, error){
    if (error) {
      return console.log('error POST line 19 client', error)
    }
    console.log('succes POST??? line 21 client', response);
  }, function(response, error){
    if (error) {
      console.log('error POST line 24 client', error)
    } else if (response) {
      console.log('SUCCESS POST line 26 client', $scope.textToPost); //****THIS DATA IS FROM INPUT FIELD :D******
    }
  })};


//REFRESH BUTTON GET.
  $scope.products = [];
  $scope.retrieve = function() {
    $http.get('/note').then(function(response, error){ //error func
      if (error) {
        console.log('error GET line 34 client', error)
      } else if(response) {
        $scope.products = response.data;
        $scope.products.reverse();
        console.log('SUCCESS GET line 37 client');//response is data sent back from server(aka all db entries)
      }
    }, function(response, error){ //success func
      if (error) {
        console.log('error GET line 41 client', error)
      } else if (response) {
        console.log('SUCCESS GET line 43 client', response);
      }
    });
  }


//TODO after page is launched
  // CRYPTODATA.  Planned to have it in server but http undefined. look into later
  $scope.cryptoData = [];
  $scope.crypto = function() {
    $http.get('https://api.coinmarketcap.com/v1/ticker/').then(function(response, error){
      if (error) {
        console.log('error GET line 52 client', error)
      } else if (response) {
        $scope.cryptoData = response.data;
        // $scope.cryptoData.reverse();
        console.log('SUCCESS GET line 54 client', response.data[0].id);
      }
      // response.send('/crypto.html')
    });
  }



}]);
