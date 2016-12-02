angular.module('starter.controllers', ['ngCordova','$actionButton', 'ionic-modal-select'])

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

//**************** START: MyShowsController ****************//
  .controller('DashCtrl', function ($scope,$cordovaSQLite, $ionicPopup, $actionButton, $ionicLoading) {

    $scope.doRefresh = function() {
      $scope.show();
      getAllShows($cordovaSQLite, getAllShowsCallback)
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply()
    };

    $scope.AllShows = {
      items: [{
        channel:null,
        date:null,
        day:null,
        id:null,
        name:null,
        notes:null,
        repeat:null,
        show_backdrop:null,
        show_id:null,
        show_overview:null,
        time:null
      }]
    };


    $scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>'
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
    getAllShows($cordovaSQLite, getAllShowsCallback)

    function getAllShowsCallback(data){
      $scope.AllShows.items.length = 0;
      for (var i = 0; i < data.rows.length; i++) {
        $scope.AllShows.items.push({
          channel:data.rows.item(i).channel,
          date:data.rows.item(i).date,
          day:data.rows.item(i).day,
          id:data.rows.item(i).id,
          name:data.rows.item(i).name,
          notes:data.rows.item(i).notes,
          repeat:data.rows.item(i).repeat,
          show_backdrop:data.rows.item(i).show_backdrop,
          show_id:data.rows.item(i).show_id,
          show_overview:unescape(data.rows.item(i).show_overview),
          time:data.rows.item(i).time
        });
      }
      $scope.hide();
    }
  })
  //**************** END: MyShowsController ****************//


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

//**************** START: AddShowController ****************//

  .controller('AddShowController', function ($scope,$stateParams, $cordovaSQLite, $ionicLoading, $ionicPopup) {
    $scope.showId = $stateParams.showId;


    // Code that is executed every time view is opened
    $scope.$on('$ionicView.enter', function() {
      jQuery("#bannerImg").attr('src','http://image.tmdb.org/t/p/w300'+$scope.TvShow.backdrop_path);
    });

    $scope.show={};
    //$scope.show.showDate = new Date(2013, 9, 22);
    //$scope.show.showRepeat = true;

    $scope.showName= { value: '' };
    $scope.showRepeat = { value: false };
    $scope.showDate = { value: new Date(Date.now()) };
    $scope.showTime = { value: null };
    $scope.showChannel = { value: null };
    $scope.showNotes = { value: '' };
    $scope.showOverview= { value: '' };
    $scope.showBackdrop= { value: null };


    $scope.TvShow='';

    $scope.AllTags = [
        {id: '', name: ''}
    ];

    $scope.AssignedTags = [
      {id: ''}
    ];

    $scope.tagSelectModel = [];


    $scope.onModelItemSelected = function(newValue, oldValue) {
      $scope.AssignedTags = newValue;
      console.log(newValue + ":" + oldValue);
    };



    $scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>'
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
    if ($scope.showId != -1){
      GetShowDetailsById($scope.showId, DisplayShowDetails);
    }
    else{
      DisplayShowDetails(null)
    }

    $scope.show();
    getAllTags($cordovaSQLite, getAllTagsCallback);

    function formatHHMM(date) {
      function z(n){return (n<10?'0':'') + n;}
      var h = date.getHours();
      return z(h%12) + ':' + z(date.getMinutes()) + ' ' + (h<12?'AM':'PM');
    }

    $scope.saveShow = function() {

      if ($scope.showName.value == undefined ||$scope.showName.value == ''){
        $ionicPopup.alert({
          title: 'Add Show',
          template: 'Please enter a Show name'
        });
        return;
      }

      if ($scope.showDate.value == undefined ||$scope.showDate.value == ''){
        $ionicPopup.alert({
          title: 'Add Show',
          template: 'Please enter a Show date'
        });
        return;
      }
      else{
        var timestamp=Date.parse($scope.showDate.value);
        if (isNaN(timestamp)!=false)
        {
          $ionicPopup.alert({
            title: 'Add Show',
            template: 'Please enter a valid Show date'
          });
          return;
        }
      }

      if ($scope.showTime.value != null || $scope.showTime.value == undefined) {
        var timestamp = Date.parse($scope.showTime.value);
        if (isNaN(timestamp) != false) {
          $ionicPopup.alert({
            title: 'Add Show',
            template: 'Please enter a valid Show time'
          });
          return;
        }
      }

      var date_parsed = Date.parse($scope.showDate.value);
      var date_value = new Date(date_parsed).toLocaleDateString();//.toJSON().slice(0, 10);

      var time_parsed = Date.parse($scope.showTime.value);
      var time_value = formatHHMM(new Date(time_parsed));
     // var time_value = new Date(time_parsed).toLocaleTimeString();//.toJSON().slice(11, 19);

      var repeat_value = $scope.showRepeat.value?1:0;

      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      var d = new Date(date_parsed);
      var day= weekday[d.getDay()];



      console.log($scope.TvShow.backdrop_path);
      //var bannerImage = document.createElement("IMG");
      //bannerImage.src = 'http://image.tmdb.org/t/p/w300'+$scope.TvShow.backdrop_path;

      bannerImage = document.getElementById('bannerImg');
      imgData = getBase64Image(bannerImage);

      $scope.show();

      addShow(
        $scope.showId,
        $scope.showName.value,
        date_value,
        day,
        time_value  ,
        repeat_value,
        $scope.showChannel.value,
        $scope.showNotes.value,
        escape($scope.showOverview.value),
        imgData,
        $scope.AssignedTags,
        $cordovaSQLite,
        saveShowCallback
      );

    };


    function saveShowCallback(data) {
      console.log(data);
      $ionicPopup.alert({
        title: 'Add Show',
        template: $scope.showName.value+' has been added to your schedule!'
      });
      $scope.hide();
    }


    function getAllTagsCallback(data) {
      $scope.AllTags.length = 0;
      for (var i = 0; i < data.rows.length; i++) {
        $scope.AllTags.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name
        });
      }
      $scope.hide();
    }

    function DisplayShowDetails(data){
      $scope.hide();

      if(data != null){
        $scope.TvShow = data;
        $scope.showName.value = $scope.TvShow.name;
        $scope.showOverview.value = $scope.TvShow.overview;
        console.log(data);
      }
    }

    function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

  })


//**************** END: AddShowController ****************//


//**************** START: SearchController ****************//
  .controller('SearchController', function ($scope,$stateParams, $ionicPopup, $actionButton, $ionicLoading, $state) {
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

    $scope.NavAddShow = function() {
      alert('Nav clicked');
      $state.go('addShow')
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
//**************** END: SearchController ****************//
