
angular.module('shootmap', ['ionic', 'shootmap.controllers', 'shootmap.services', 'angular-carousel'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {    
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })

    .state('app.locations', {
      url: "/locations//:search",
      views: {
        'menuContent' :{
          templateUrl: "templates/locations.html",
          controller: 'ListCtrl'
        }
      }
    })

    .state('app.add', {
      url: "/add",
      views: {
        'menuContent' :{
          templateUrl: "templates/addLocation.html",
          controller: "AddLocation"
        }
      }
    })

    .state('app.location', {
      url: "/locations/:locationId",
      views: {
        'menuContent' :{
          templateUrl: "templates/location.html",
          controller: 'LocationsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/locations//');
});

