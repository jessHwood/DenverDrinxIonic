angular.module('controllers', [])

.controller('MapCtrl', MapCtrl)
.controller('BarsCtrl', BarsCtrl)
.controller('BarDetailCtrl', BarDetailCtrl)
.controller('UberCtrl', UberCtrl)

.controller('AccountCtrl', AccountCtrl);

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
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: "../img/markTEST.png"
      });  

      //for each bar, http request google and drop a marker on the map
      self.bars.forEach(function(bar){
        var APIkey = '&key=AIzaSyAjuUQ2aRpUh5usOm0MYAex-9MgiBEA9Jg';
        $http
          .get('https://maps.googleapis.com/maps/api/geocode/json?address=' + bar.address + APIkey)
          .then(function(location){
            //marker specific to each bar
            var marker = new google.maps.Marker({
                map: self.map,
                animation: google.maps.Animation.DROP,
                position: location.data.results[0].geometry.location
                //icon: [icon location]
            });  
          });   
      });     
    });
  }, function(error){
    console.log("Could not get location");
  });



}

function BarsCtrl(Bars) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var self = this;
  self.bars = Bars.all();

//create timer of each bar
  self.bars.forEach(function(bar){
    bar.timeLeft = function(){
      //console.log(this);
      //console.log('running time left' + bar.name);
      var currentTime = new Date();
      var timer = 0;

      for (i = 0; i < this.day.length; i++){

        if (this.day[i] === currentTime.getDay()) {
//console.log('here');
          var currentHour = currentTime.getHours();
          var currentMinutes = currentTime.getMinutes();
          //console.log('found a happy hour for today!');

          if (currentHour <= this.hours[i][0]){
            //happy hour has not started yet

           timer += (this.hours[i][0] - currentHour) * 60;
           timer += (this.minutes[i][0] - currentMinutes);
            if (timer > 0){
              return this.name + ' starts in :' + timer + ' minutes';
            } 
            //or is in progress
            if (timer <= 0){
              timer = 0;
              timer += (this.hours[i][1] - currentHour) * 60;
              timer += (this.minutes[i][1] - currentMinutes);
              return this.name + ' has minutes left: ' + timer;
            }
          }

          if (currentHour >= this.hours[i][0]){
            //happy hour is in progress
              timer = 0;
              timer += (this.hours[i][1] - currentHour) * 60;
              timer += (this.minutes[i][1] - currentMinutes);
            if (timer > 0){
              return this.name + ' has minutes left: ' + timer;
            }   
            //or is over (check minutes & end hour)
            if (timer <= 0) {
              return this.name + ' is over';
            }
          }
        }
      }
    };
  });
  //end timer

}

function BarDetailCtrl($stateParams, Bars) {
  var self = this;
  self.bar = Bars.get($stateParams.barId);
}

function UberCtrl(){
  console.log('uber controller working as expected');
}


function AccountCtrl() {

}

