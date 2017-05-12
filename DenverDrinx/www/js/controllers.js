angular.module('controllers', [])

.controller('MapCtrl', MapCtrl)
.controller('BarsCtrl', BarsCtrl)
.controller('BarDetailCtrl', BarDetailCtrl)
.controller('UberCtrl', UberCtrl)

.controller('AccountCtrl', AccountCtrl); //to be scapped

MapCtrl.$inject = ['$cordovaGeolocation', 'Bars', '$http'];
function MapCtrl($cordovaGeolocation, Bars, $http) {
  var self = this;
  self.bars = Bars.all();
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
}//end MapCtrl

BarsCtrl.$inject = ['Bars', '$http', '$cordovaGeolocation'];
function BarsCtrl(Bars, $http, $cordovaGeolocation) {
  var self = this;
  self.bars = Bars.all();

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
        return dist.toPrecision(2);
      }
      return distance(position.coords.latitude, position.coords.longitude, location.data.results[0].geometry.location.lat, location.data.results[0].geometry.location.lng);
    };


    //timer function
    bar.timeLeft = function(){
      var currentTime = new Date();
      var timer = 0;

      for (i = 0; i < this.day.length; i++){
        //if happy hour is today
        if (this.day[i] === currentTime.getDay()) {
          //get current time
          var currentHour = currentTime.getHours();
          var currentMinutes = currentTime.getMinutes();
         
          //happy hour has not started yet
          if (currentHour <= this.hours[i][0]){

            timer += (this.hours[i][0] - currentHour) * 60;
            timer += (this.minutes[i][0] - currentMinutes);
            if (timer > 0){
              return this.name + ' starts in :' + timer + ' minutes';
            } 
            //or is happy hour is in progress?
            if (timer <= 0){
              timer = 0;
              timer += (this.hours[i][1] - currentHour) * 60;
              timer += (this.minutes[i][1] - currentMinutes);
              return this.name + ' has minutes left: ' + timer;
            }
          }
          //happy hour is in progress
          if (currentHour >= this.hours[i][0]){
            timer = 0;
            timer += (this.hours[i][1] - currentHour) * 60;
            timer += (this.minutes[i][1] - currentMinutes);
            //still time left!
            if (timer > 0){
              return this.name + ' has minutes left: ' + timer;
            }   
            //or has it ended?
            if (timer <= 0) {
              return this.name + ' is over';
            }
          }
        }
      }
    };//end timer
    });
    });
  });
}

function BarDetailCtrl(Bars, $stateParams) {
  var self = this;
  console.log();
  self.bar = Bars.get($stateParams.barId);

  //get directions (list) to this bar
}

function UberCtrl(){
  console.log('uber controller working as expected');
}


function AccountCtrl() {

}

