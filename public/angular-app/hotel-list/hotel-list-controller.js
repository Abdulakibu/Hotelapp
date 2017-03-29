function HotelsController($http){
  var ctrl = this;
  ctrl.title ="Mean Hotel App";
  $http.get('/api/hotels?count=10')
  .then(function(response){
    console.log(response);
    ctrl.hotels = response.data;

  })
}


angular.module('meanhotel')
.controller('HotelsController',HotelsController);
