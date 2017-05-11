angular.module('factories', [])

.factory('Bars', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var bars =  [{
    day       : [ 4 ],
    hours       : [ [ 14 , 17 ] ],
    minutes     : [ [ 0 , 30 ] ],
    address     : "1234 Seseme Street",
    name      : "Big Bird's Booze House",
    drinkSpecials : "$1.00 Double-Shots",
    foodSpecials  : "$0.50 Corn-dogs",
    id : 1
  },
  {
    day       : [ 4 ],
    hours       : [ [ 14 , 17 ] ],
    minutes     : [ [ 0 , 30 ] ],
    address     : "5678 Seseme Street",
    name      : "Oscar's Hootch Can",
    drinkSpecials : "$5 PBRs",
    foodSpecials  : "Used Pringles",
    id : 2
  }];

  return {
    all: function() {
      return bars;
    },
    remove: function(bar) {
      bars.splice(chats.indexOf(bar), 1);
    },
    get: function(barId) {
      for (var i = 0; i < bars.length; i++) {
        if (bars[i].id === parseInt(barId)) {
          return bars[i];
        }
      }
      return null;
    }
  };
});
