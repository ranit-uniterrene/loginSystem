angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('homeCtrl', function($scope, $rootScope, $stateParams, $ionicPopup) {
  $rootScope.usermail = "there";
 
})
//for signup
.controller('registerCtrl', function($scope, $location, $http, $rootScope, $stateParams, $ionicPopup, $state,$ionicHistory) {
  $scope.signup = function (data) {
    var link = 'http://ionicapps.coolpage.biz/signup.php';
      $http.post(link, {n : data.name, un : data.username, ps : data.password , ph: data.phone , add : data.address , pin : data.pincode })
      .then(function (res){ 
        $scope.response = res.data.result; 
        console.log(res.data.result);
        if($scope.response.created=="1"){
          $scope.title="Account Created!";
          $scope.template="Your account has been successfully created!";
          
          //no back option
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          $state.go('login', {}, {location: "replace", reload: true});
        
        }else if($scope.response.exists=="1"){
          $scope.title="Email Already exists";
          $scope.template="Please click forgot password if necessary";
          $state.go('login', {}, {location: "replace", reload: true});
          $scope.userData.email = data.username;
        
        }else{
          $scope.title="Failed";
          $scope.template="Contact Our Technical Team";
          $state.go('home', {}, {location: "replace", reload: true});
        }
        
        var alertPopup = $ionicPopup.alert({
            title: $scope.title,
            template: $scope.template
        });

      });
  }
 
})
//for login
.controller('loginCtrl', function($scope, $http, $rootScope,$ionicPopup, $ionicLoading, $stateParams, $location, $state,$ionicHistory) {
  $scope.user = {};
  $scope.loginSubmit = function () {

      //str="http://ionicapps.coolpage.biz/user-details.php";
      str="http://ionicapps.coolpage.biz/user-details.php?e="+$scope.user.email+"&p="+$scope.user.password;
      console.log(str, $scope.user)
      $http.get(str, $scope.user).success(function (data) {
        console.log(data);
         $state.go('app.playlists', {}, {location: "replace", reload: true});
        var alertPopup = $ionicPopup.alert({
            title: 'Login Success!',
            template: 'Redirecting to your Dashbord',
           
          });
      }).error(function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'

          });
      });
      
      


      
    
    
  }
});
