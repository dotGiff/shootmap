angular.module('shootmap.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ListCtrl', ['$scope', '$http', '$stateParams', 'Locations', 'myMap', function($scope, $http, $stateParams, Locations, myMap) {
  $scope.locations;
  $scope.search = $stateParams.search;
  
  Locations.getLocations()
    .success(function(loc){
      $scope.locations = loc;
    })
    .error(function(error){
      $scope.locations = 'whoops, something went wrong: ' + error.message;
    });
  
}])

.controller('LocationsCtrl', ['$scope', '$stateParams', '$http', '$ionicLoading', '$compile', 'Locations', 'myMap', function($scope, $stateParams, $http, $ionicLoading, $compile, Locations, myMap) {
  $scope.locationn;
  $scope.viewPort = document.documentElement.clientWidth;
  var address;
  var rating;
  var defaultVal = "-outline";
  var ratingArray = [defaultVal,defaultVal,defaultVal,defaultVal,defaultVal];

  Locations.getLocations($stateParams.locationId)
    .success(function(loc){
      for (var key in loc) {
        if (loc.hasOwnProperty(key) == false) {continue};
        if ($stateParams.locationId != loc[key]['id']) {continue};
        $scope.location = loc[key];

        rating = loc[key]['rating'];
        ratingArray.length = 5;
        for(var i = 0; i < rating; i++){
          ratingArray[i] = "";
        }
        // $scope.stars = JSON.stringify(ratingArray);
        $scope.starsRating = ratingArray;

      }//for
    })
    .error(function(error){
      console.log(error);
    });

  $scope.myActiveSlide = 0;
  console.log($scope.myActiveSlide);
  $scope.slideChange = function(index){
    console.log(index);
  }
}])

.controller('AddLocation', ['$scope', '$http', 'Locations', 'myMap', function($scope, $http, Locations, myMap) {
  
  // navigator.geolocation.getCurrentPosition(function(pos) {
  //   $scope.lat = pos.coords.latitude;
  //   $scope.lng = pos.coords.longitude;
  //   console.log($scope.lat + ' - ' + $scope.lng);
  // }, function(error) {
  //   alert('Unable to get location: ' + error.message);
  // });

}]);

