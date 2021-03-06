var api_key = 'ee2f6cbd1928d547ccd02273e325c780';
var image_url ='http://image.tmdb.org/t/p/w300//o40Wv2cCxbUUpBoDa7imlLE05mB.jpg'


function GetShowDetailsById(showId, callback) {
  var base_url = 'https://api.themoviedb.org/3/tv/';
  base_url = base_url + showId;
  base_url = base_url + '?api_key=' + api_key;
  base_url = base_url + '&language=en-US';

  $.ajax({
    type: "GET",
    "crossDomain": true,
    "async": true,
    url: base_url,
    data: {},
    headers: {}
  }).done(function (data) {
    return callback(data);
  }).fail(function (error){
    console.log('Get show details failing: '+error.statusText);
    return callback(null);
  });
}


function Search(query, callback) {
  var base_url = 'https://api.themoviedb.org/3/search/tv?';
  base_url = base_url + 'api_key=' + api_key;
  base_url = base_url + '&language=en-US';
  base_url = base_url + '&query=' + query;

  $.ajax({
    type: "GET",
    "crossDomain": true,
    "async": true,
    url: base_url,
    data: {},
    headers: {}
  }).done(function (data) {
    return callback(data);
  }).fail(function (error){
    console.log('Search query failing: '+error.statusText);
    return callback(null);
  });

}

function GetGenreList(callback) {
  var base_url = 'https://api.themoviedb.org/3/genre/movie/list?';
  base_url = base_url + 'api_key=' + api_key;
  base_url = base_url + '&language=en-US';

  $.ajax({
    type: "GET",
    "crossDomain": true,
    "async": true,
    url: base_url,
    data: {},
    headers: {}
  }).done(function (data) {
    return callback(data);
  });

}
