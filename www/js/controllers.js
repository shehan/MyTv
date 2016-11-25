angular.module('starter.controllers', ['ngCordova','$actionButton'])

  .controller('TagListingController', function ($scope, $stateParams, $cordovaSQLite, $ionicPopup, $actionButton, $ionicLoading) {

    $scope.AllTags = {
      items: [
        {id: '', name: ""}
      ]
    };
    $scope.input = {newTagName:''};
    $scope.dataLoading = false;

    // Code that is executed every time view is opened
    $scope.$on('$ionicView.enter', function() {
      //shows the floating button
      $actionButton.create({
        mainAction: {
          icon: 'ion-android-add',
          backgroundColor: '#387ef5',
          textColor: ' white',
          removeOnStateChange: false,
          onClick: function() {
            $scope.showAdd();
          }
        }
      });
    });

    $scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>',
        duration: 3000
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    };

    $scope.show();
    getAllTags($cordovaSQLite, getAllTagsCallback);

    add = function(tagName){
      $scope.show();
      addTag(tagName,$cordovaSQLite,getAllTagsCallback);
    };

    update = function(tagId, tagName){
      $scope.show();
      updateTag(tagId, tagName, $cordovaSQLite, getAllTagsCallback);
    };

    remove = function(tagId){
      $scope.show();
      removeTag(tagId,$cordovaSQLite,getAllTagsCallback);
    };


    $scope.saveTag = function (tagName) {
      if (tagName == undefined ||tagName == '')
        $ionicPopup.alert({
          title: 'Add new tag',
          template: 'Please enter a tag name'
        });
      else{
        add(tagName);
        $scope.input.newTagName='';
      }
    };

    $scope.showAdd = function () {
      $scope.data = {tagName: ''};
      $ionicPopup.confirm({
        template:'<input ng-model="data.tagName" type="text" placeholder="New Tag">',
        title: 'Add new tag',
        subTitle: 'Please Enter a name for the tag',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel', onTap: function (e) {
            return false;
          }
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if ($scope.data.tagName != ''){
                add($scope.data.tagName)
              }
              else{
                $scope.showAdd();
              }
            }
          }
        ]
      });
    };


    $scope.showUpdate = function (tag) {
      $scope.data = {tagName: tag.name};
      $ionicPopup.confirm({
        template: '<input ng-model="data.tagName" type="text" placeholder="Update Tag">',
        title: 'Update tag - ' + tag.name,
        subTitle: 'Please Enter the new name for this tag',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel', onTap: function (e) {
            return false;
          }
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if ($scope.data.tagName != '') {
                update(tag.id, $scope.data.tagName);
              }
              else {
                $scope.showUpdate(tag);
              }
            }
          }
        ]
      });
    };


    $scope.showRemove = function (tag) {
      var confirmPopup  = $ionicPopup.confirm({
        title: 'Remove Tag - '+tag.name,
        template: 'Are you sure you want to delete this tag?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          remove(tag.id);
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
     $scope.hide();
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

  .controller('SearchController', function ($scope,$stateParams, $ionicPopup, $actionButton, $ionicLoading) {
    $scope.input = {
      searchQuery: ''
    };



    // Code that is executed every time view is opened
    $scope.$on('$ionicView.enter', function() {
      getAllGenres(allGenres);
    });

    function allGenres(result) {
      $scope.all_genres = result;
    }



    $scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>',
        duration: 3000
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    };

    $scope.runQuery = function (query) {
      if (query == undefined ||query == '')
        $ionicPopup.alert({
          title: 'Search',
          template: 'Please enter a search query'
        });
      else{
        $scope.show();
        Search(query, displaySearchResults);
      }
    };

    $scope.toggleItem= function(item) {
      if ($scope.isItemShown(item)) {
        $scope.shownItem = null;
      } else {
        $scope.shownItem = item;
      }
    };
    $scope.isItemShown = function(item) {
      return $scope.shownItem === item;
    };

    function displaySearchResults(data) {
      $scope.AllTags = {
        results: [ ]
      };

      if(data != null) {
        for (var i = 0; i < data.results.length; i++) {
          for (var j = 0; j < data.results[i].genre_ids.length; j++) {
            for (var k = 0; k < $scope.all_genres.rows.length; k++) {
              if (data.results[i].genre_ids[j] == $scope.all_genres.rows[k].id) {
                console.log("Before:" + data.results[i].genre_ids[j]);
                data.results[i].genre_ids[j] = $scope.all_genres.rows[k].name;
                console.log("After:" + data.results[i].genre_ids[j]);
              }
            }
          }
        }
        $scope.AllTags = data;
      }

      $scope.hide();
    }
  });
