angular.module('controllers', [])

.controller('MapCtrl', MapCtrl)
.controller('BarsCtrl', BarsCtrl)
.controller('BarDetailCtrl', BarDetailCtrl)
.controller('UberCtrl', UberCtrl)

.controller('AccountCtrl', AccountCtrl); //to be scapped

MapCtrl.$inject = ['$cordovaGeolocation', 'Bars', '$http'];
function MapCtrl($cordovaGeolocation, Bars, $http) {

  var self = this;
  self.getbars = Bars.all().then(function(res){
  self.bars = res.data.filter(function(bar){
    var date = new Date();
    today = date.getDay();
    for (i = 0; i < bar.day.length; i++){
      if (bar.day[i] === today) { return bar; }
    }

  });


  var options = {timeout: 10000, enableHighAccuracy: true};
  //get position of user
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //create a map based on user position
    self.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    google.maps.event.addListenerOnce(self.map, 'idle', function(){
    //this marker is the user's location
      var marker = new google.maps.Marker({
        map: self.map,
        position: latLng,
        icon: "../img/meMarker.png"
        
      });  

      //for each bar, http request google and drop a marker on the map
      self.bars.forEach(function(bar){
        //var APIkey = '&key=AIzaSyAjuUQ2aRpUh5usOm0MYAex-9MgiBEA9Jg';
        var APIkey = '&key=AIzaSyAyK0Os0XVzIhzeOk0ZJw5OTAf7rdeNXGQ';
        $http
          .get('https://maps.googleapis.com/maps/api/geocode/json?address=' + bar.address + APIkey)
          .then(function(location){
            //marker specific to each bar
            var marker = new google.maps.Marker({
                map: self.map,
                animation: google.maps.Animation.DROP,
                position: location.data.results[0].geometry.location,
                icon: '../img/drinkTEST.png'
            });  
          });   
      });     
    });
  }, function(error){
    console.log("Could not get location");
  });
});
}//end MapCtrl

BarsCtrl.$inject = ['Bars', '$http', '$cordovaGeolocation'];
function BarsCtrl(Bars, $http, $cordovaGeolocation) {
 //setTimeout(function(){
  var self = this;
  Bars.all().then(function(res){

    self.bars = res.data.filter(function(bar){
    var date = new Date();
    today = date.getDay();
    for (i = 0; i < bar.day.length; i++){
      if (bar.day[i] === today) { return bar; }
    }
  });

//create timer (and distance) of each bar
  self.bars.forEach(function(bar){

    //find distance to each bar
    //var APIkey = '&key=AIzaSyAjuUQ2aRpUh5usOm0MYAex-9MgiBEA9Jg';
    var APIkey = '&key=AIzaSyAyK0Os0XVzIhzeOk0ZJw5OTAf7rdeNXGQ';

   $http
      .get('https://maps.googleapis.com/maps/api/geocode/json?address=' + bar.address + APIkey)
      .then(function(location){
        //get position of user
        var options = {timeout: 5000, enableHighAccuracy: true};
          
          $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        
    bar.distance = function(){
      //distance calculation
      function distance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (dist < 0.01) { return 0.01; }
        return dist;
      }
      return distance(position.coords.latitude, position.coords.longitude, location.data.results[0].geometry.location.lat, location.data.results[0].geometry.location.lng);
    };


    //timer function
    bar.timeLeft = function(){
      var currentTime = new Date();
      var timer = 0;
      //problem with events that go past midnight (i.e WILLCALL bar)

      for (i = 0; i < this.day.length; i++){
          //account for events past midnight
          if (this.hours[i][1] < this.hours[i][0]){
            this.hours[i][1] += 23;
          }
          //get current time
          var currentHour = currentTime.getHours();
          var currentMinutes = currentTime.getMinutes();
         
          //happy hour has not started yet
          if (currentHour <= this.hours[i][0]){

            timer += (this.hours[i][0] - currentHour) * 60;
            timer += (this.minutes[i][0] - currentMinutes);
            if (timer > 0){
              return 'Starts at ' + toClockTime([this.hours[i][0], this.minutes[i][0]]);
            } 
            //or is happy hour is in progress?
            if (timer <= 0){
              timer = 0;
              timer += (this.hours[i][1] - currentHour) * 60;
              timer += (this.minutes[i][1] - currentMinutes);
              return 'Ends in ' + fixTime(timer);
            }
          }
          //happy hour is in progress
          if (currentHour >= this.hours[i][0]){
            timer = 0;
            timer += (this.hours[i][1] - currentHour) * 60;
            timer += (this.minutes[i][1] - currentMinutes);
            //still time left!
            if (timer > 0){
              return 'Ends in ' + fixTime(timer);
            }   
            //or has it ended?
            if (timer <= 0) {
              return 'Ended';
            }
          }
        }

    };//end timer
    });
    });
  });
  //sort???

});

self.distString = function(miles){
  if (!miles) { return ""; }
   return miles.toPrecision(2) + ' miles'; 
  
};

function fixTime(timer){
  numMins = timer%60;
  if (numMins < 10) { numMins = '0' + numMins; }
  numHours = Math.floor(timer/60);
  return numHours + ':' + numMins;
}

function toClockTime(timeArray){
  var postfix = ' AM';
  var hours = timeArray[0];
  var minutes = timeArray[1];
  if (hours > 12) { //past noon
    hours -= 12; 
    postfix = ' PM'; 
  }
  if (minutes < 10) { //add a prepending 0
    minutes = '0' + minutes; 
  }
  return hours + ':' + minutes + postfix;
}

}//end bar control
function BarDetailCtrl(Bars, $stateParams) {
  var self = this;
  Bars.get($stateParams.barId).then(function(res){
    self.bar = res.data;
  });

  //get directions (list) to this bar
}

function UberCtrl(){
  console.log('uber controller working as expected');
}


function AccountCtrl() {

}

