// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Auth', function($firebaseAuth) {
    var endPoint = 'https://maxcsg.firebaseio.com/' ;
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  })

.controller('AppCtrl', function($scope, Auth) {
  $scope.login = function(authMethod) {

    var ref = new Firebase("https://maxcsg.firebaseio.com");
    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        alert("error");
        console.log("Login Failed!", error);
      } else {
        alert("successfully");
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    // Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
    //   alert("sjdfbnsjdk");
    //   alert("sucess"+JSON.stringify(authData));
    // }).catch(function(error) {
    //   if (error.code === 'TRANSPORT_UNAVAILABLE') {
    //     Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
    //       alert("TRANSPORT_UNAVAILABLE");
    //     });
    //   } else {
    //     alert("error");
    //     console.log(error);
    //   }
    // });
  };

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      // alert("authData null");
      console.log('Not logged in yet');
    } else {
      // alert("authData00");
      console.log('Logged in as', authData.uid);
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });


})
