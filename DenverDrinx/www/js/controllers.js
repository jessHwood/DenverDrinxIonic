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

