angular.module('controllers', [])

.controller('MapCtrl', MapCtrl)
.controller('BarsCtrl', BarsCtrl)
.controller('BarDetailCtrl', BarDetailCtrl)
.controller('UberCtrl', UberCtrl)

.controller('AccountCtrl', AccountCtrl);

function MapCtrl() {
  //map related stuff goes here

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
  // self.remove = function(bar) {
  //   Bars.remove(bar);
  // };
  self.bars.forEach(function(bar){
    bar.timeLeft = function(){
      //console.log(this);
      //console.log('running time left' + bar.name);
      var currentTime = new Date();
      var timer = 0;

      for (i = 0; i < this.day.length; i++){

        if (this.day[i] === currentTime.getDay()) {
          
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
  self.bars.forEach(function(bar){ bar.timeLeft(); });
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

