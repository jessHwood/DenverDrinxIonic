angular.module('factories', [])


.factory('Bars', Bars);


Bars.$inject = ['$http'];
function Bars($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var bars =  [
  {
    day       : [ 1, 2, 3, 4, 5, 6 ],
    hours       : [ [ 15 , 18 ], [ 15 , 18 ], [ 15 , 18 ], [ 15 , 18 ], [ 15 , 18 ], [ 15 , 18 ] ],
    minutes     : [ [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ] ],
    address     : "6575 South Greenwood Plaza Boulevard, Englewood, CO 80112",
    name      : "C.B. & Potts",
    drinkSpecials : "$3.25 POTTS Beers, $3.25 Well Drinks, $3.25 POTTS Teas, $3.25 6oz Pour of House Wine",
    foodSpecials  : "$2 - $3 Snacks, $5 Appetizers, $5 Sliders",
    description: "this is a description",
    phone: "555-555-5555",
    website: "http://www.cbpotts.com/colorado/denvertech.html",
    image: "http://source.colostate.edu/wp-content/uploads/2016/04/shark-large.jpg",
    id : 1
  },
  {
    day             : [ 1, 2, 3, 4, 5 ],
    hours             : [ [15 , 22], [15 , 18], [15 , 18], [15 , 18], [15 , 18] ],
    minutes         : [ [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ], [ 0 , 0 ] ],
    address            : "The Source, 3350 Brighton Boulevard, Unit 105",
    phone            : "(303) 296-2747",
    name            : "Comida",
    drinkSpecials    : "$5 Margaritas and Cocktails, $2-$3 Beers, $5 House Wines.",
    foodSpecials    : "$4 Street Snacks, $15 Bacon Tacos with a shot of Maker's Mark",
    image            : "https://cdn.wedding-spot.com/images/venues/2751/comida-at-the-source-wedding-denver-co-1.1427695390.jpg",
    description        : "Sit-down extension of a popular food truck featuring Mexican street eats & creative margaritas.",
    website            : "http://www.eatcomida.com",
    id: 2
  }
];



  return {
    all: function() {
      return bars;
    },
    makeBars: function(){
      
    },
    get: function(id){
      return bars[id-1];
    }
  };
}
