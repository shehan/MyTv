// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])



  .run(function ($ionicPlatform, $cordovaSQLite, $rootScope) {
    $ionicPlatform.ready(function () {
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

      // Initialize MyTV database - code contained in db.js
      initDatabase($cordovaSQLite)

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.my-shows', {
        url: '/my-shows',
        views: {
          'tab-my-shows': {
            templateUrl: 'templates/tab-my-shows.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.my-show-details', {
        url: '/my-show-details/:Id/:showId',
        views: {
          'tab-my-shows': {
            templateUrl: 'templates/tab-show-details.html',
            controller: 'ViewShowDetailsController'
          }
        }
      })

      .state('tab.show-tags', {
        url: '/show-tags/:tagId/:tagName',
        views: {
          'tab-my-shows': {
            templateUrl: 'templates/tab-show-tags.html',
            controller: 'ViewShowTagsController'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.tagListing', {
        url: '/tagListing',
        views: {
          'tab-tagListing': {
            templateUrl: 'templates/tab-tagListing.html',
            controller: 'TagListingController'
          }
        }
      })

      .state('tab.addShow', {
        url: '/addShow/:showId',
        views: {
          'tab-search': {
            templateUrl: 'templates/add-show.html',
            controller: 'AddShowController'
          }
        }
      })


      .state('tab.search', {
        url: '/search',
        views: {
          'tab-search': {
            templateUrl: 'templates/tab-search.html',
            controller: 'SearchController'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/my-shows');

  });
