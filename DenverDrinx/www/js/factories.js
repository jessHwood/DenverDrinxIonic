angular.module('factories', [])



.factory('Bars', Bars);


Bars.$inject = ['$http'];
function Bars($http) {
  var self = this;

  return {
    all: function() {
      return $http.get('http://localhost:3000/api/bars/index');
    },
    makeBars: function(){
      
    },
    get: function(id){
      console.log('WE NEED TO ADD A GET/:id route to our server');
      return $http.get('http://localhost:3000/api/bars/' + id);
    }
  };
}
