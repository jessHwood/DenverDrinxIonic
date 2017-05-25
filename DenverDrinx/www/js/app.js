// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('denver-drinx', [ 'ionic', 'ngCordova', 'controllers', 'factories']) //'ngMockE2E'

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

   }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  //login state
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
  })



  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

// takes you to all bars view
  .state('tab.bars', {
      url: '/bars',
      views: {
        'tab-bars': {
          templateUrl: 'templates/tab-bars.html',
          controller: 'BarsCtrl'
        }
      }
    })

// once you click on a bar this takes you to full bar detail with deals and website
    .state('tab.bar-detail', {
      url: '/bars/:barId',
      views: {
        'tab-bars': {
          templateUrl: 'templates/bar-detail.html',
          controller: 'BarDetailCtrl'
        }
      }
    })

//currently not using this tab - will be moving it to lyft as well
  .state('tab.uber', {
    url : '/uber',
    views: {
      'tab-uber': {
        templateUrl: 'templates/tab-uber.html',
        controller: 'UberCtrl'
      }
    }
  })

//this is being use as our "About Us" page
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //
  $urlRouterProvider.otherwise('/login');
  //$urlRouterProvider.otherwise('/tab/bars');
  

});
