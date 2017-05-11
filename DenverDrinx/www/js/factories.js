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
        day             : [ 1, 2, 3, 4, 5 ],
        hours             : [ [15 , 22], [15 , 18], [15 , 18], [15 , 18], [15 , 18] ],
        minutes         : [ [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ] ],
        address            : "The Source, 3350 Brighton Boulevard, Unit 105",
        phone            : "(303) 296-2747",
        name            : "Comida",
        drinkSpecials    : "$5 Margaritas and Cocktails, $2-$3 Beers, and $5 House Wines.",
        foodSpecials    : "$4 Street Snacks, $15 Bacon Tacos with a shot of Maker's Mark",
        image            : "https://cdn.wedding-spot.com/images/venues/2751/comida-at-the-source-wedding-denver-co-1.1427695390.jpg",
        description        : "Sit-down extension of a popular food truck featuring Mexican street eats & creative margaritas.",
        website            : "eatcomida.com/en/",
        id: 2
    },


  ];

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
