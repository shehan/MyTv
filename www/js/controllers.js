angular.module('starter.controllers', ['ngCordova'])

  .controller('TagListingController', function ($scope, $stateParams, $cordovaSQLite, $ionicPopup) {
    //$scope.chat = Chats.get($stateParams.chatId);
    var tags = getAllTags($cordovaSQLite, getAllTagsCallback);
    console.log(tags);

    $scope.AllTags = {
      items: [
        {id: '', name: ""}
      ]
    };

    $scope.update = function (tag) {
      $scope.data = {response: tag.name };
      var confirmPopup  = $ionicPopup.prompt({
        title: 'Update tag - ' + tag.name,
        subTitle: 'Please Enter the new name for this tag',
        scope: $scope
      }).then(function(res) {
        if ($scope.data.response == '') {
          $scope.update(tag);
        }
        else {
          updateTag(tag.id,$scope.data.response,$cordovaSQLite,getAllTagsCallback)
        }
      });
      };



    $scope.remove = function (tag) {
      var confirmPopup  = $ionicPopup.confirm({
        title: 'Remove Tag - '+tag.name,
        template: 'Are you sure you want to delete this tag?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          removeTag(tag.id,$cordovaSQLite,getAllTagsCallback)
          console.log('Tag Removed - '+tag.name);
        } else {
          console.log('Deletion canceled !');
        }
      });
    };

    function getAllTagsCallback(data) {
      $scope.AllTags.items.length = 0;
      for (var i = 0; i < data.rows.length; i++) {
        $scope.AllTags.items.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name
        });
      }

      // $scope.AllTags = data;
    }


  })


  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
