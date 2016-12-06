/*
 Database Connection class
 */
var db = window.openDatabase("MyTV.db", '1.0', 'MyTV Database', 65536);
var cordovaSQLite = null;
function initDatabase($cordovaSQLite) {
  try {

    cordovaSQLite = $cordovaSQLite;

    db = window.openDatabase("MyTV.db", '1.0', 'MyTV Database', 65536)
    $cordovaSQLite.execute(db,"PRAGMA foreign_keys=ON");;

    var sql_tag = 'CREATE TABLE IF NOT EXISTS tag (' +
                    'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                    'name VARCHAR(50), ' +
                    'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                    'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP' +
                  ')';

    var sql_show = 'CREATE TABLE IF NOT EXISTS show (' +
                      'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                      'name VARCHAR(255), ' +
                      'show_id VARCHAR(255), ' +
                      'notes VARCHAR(255), ' +
                      'date VARCHAR(255), ' +
                      'day VARCHAR(255), ' +
                      'time VARCHAR(255), ' +
                      'channel INTEGER, ' +
                      'repeat BOOLEAN, ' +
                      'show_overview TEXT,' +
                      'show_backdrop BLOB,' +
                      'notification_id INTEGER,' +
                      'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                      'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP' +
                    ')';

    var sql_show_tag = 'CREATE TABLE IF NOT EXISTS show_tag (' +
                          'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                          'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                          'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP,' +
                          'id_tag INTEGER NOT NULL, ' +
                          'id_show INTEGER NOT NULL, ' +
                          'FOREIGN KEY (id_tag) REFERENCES tag (id) ON DELETE CASCADE, ' +
                          'FOREIGN KEY (id_show) REFERENCES show (id) ON DELETE CASCADE' +
                        ')';

    var sql_genre = 'CREATE TABLE IF NOT EXISTS genre (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) ' +
      ')';

    console.log("Database - Create Table - Tag");
    $cordovaSQLite.execute(db, sql_tag);

    console.log("Database - Create Table - Show");
    $cordovaSQLite.execute(db, sql_show);

    console.log("Database - Create Table - Show_Tag");
    $cordovaSQLite.execute(db, sql_show_tag);

    console.log("Database - Create Table - Genre");
    $cordovaSQLite.execute(db, sql_genre);

   // DB_Test($cordovaSQLite);

    DB_PopulateGenre()

  }
  catch(error){
    alert('Error Encountered During Database Init!');
    console.log(error);
  }
}

var genre_inprogress = false;
function DB_PopulateGenre(result){
  if ((result == undefined ||result == null) && !genre_inprogress){
    genre_inprogress = true;
    GetGenreList(DB_PopulateGenre)
  }
  else{
    genre_inprogress = false;
    console.log(result);

    for(var i=0;i<result.genres.length;i++){
      var sql_insert_genre = " INSERT OR REPLACE INTO genre (id, name) " +
            "VALUES ("+result.genres[i].id+",'"+result.genres[i].name+"')"

      cordovaSQLite.execute(db, sql_insert_genre)
        .then(function (result) {
          return console.log("Inserted genre");
        }, function (err) {
          console.log(err);
        });

    }

  }

}

function getAllGenres(callback) {
  var sql_select = 'SELECT * FROM genre';

  console.log("Database - All Genres");
  return cordovaSQLite.execute(db, sql_select)
    .then(function (result) {
        return callback(result);
    }, function (err) {
      alert('Cannot get genre id');
      console.error(err);
    });

}

function getGenreById(id, callback) {
  var sql_select = 'SELECT * FROM genre' +
                    'WHERE id='+id+'';

  console.log("Database - Genre By Id:"+id);
  return cordovaSQLite.execute(db, sql_select)
    .then(function (result) {
      if (callback == undefined)
        return result;
      else
        return callback(result);
    }, function (err) {
      alert('Cannot get genre id');
      console.error(err);
    });

}

function getAllTags($cordovaSQLite, callback) {
  var sql_select = 'SELECT * FROM tag Order By name';

  console.log("Database - Select All Tags");
  $cordovaSQLite.execute(db, sql_select)
    .then(function (result) {
      return callback(result);
  }, function (err) {
    alert('Cannot get Tags');
    console.error(err);
  });

}

function getAllShows($cordovaSQLite, callback) {

  var sql_select = 'SELECT * FROM show Order By name';

  console.log("Database - Select All Shows");
  $cordovaSQLite.execute(db, sql_select)
    .then(function (result) {
      return callback(result);
    }, function (err) {
      alert('Cannot get Shows');
      console.error(err);
    });
}

function addTag(tagName, $cordovaSQLite, callback) {
  var sql_insert_tag = 'INSERT INTO tag (name) VALUES ("'+tagName+'")';

  console.log("Database - Insert Tag");
  $cordovaSQLite.execute(db, sql_insert_tag)
    .then(function (result) {
      return getAllTags($cordovaSQLite, callback);
    }, function (err) {
      alert('Cannot insert tag');
      console.log(err);
    });

}

function removeTag(tagId, $cordovaSQLite, callback) {
  var sql_delete_tag = 'DELETE FROM tag WHERE id = '+tagId;

  console.log("Database - Delete Tag");
  $cordovaSQLite.execute(db, sql_delete_tag)
    .then(function (result) {
      //cascade delete doesn't work, so manually delete the records from show_tag table
      $cordovaSQLite.execute(db,"DELETE FROM show_tag WHERE id_tag = "+tagId);
      return getAllTags($cordovaSQLite, callback);
    }, function (err) {
      alert('Cannot delete tag');
      console.log(err);
    });

}

function updateTag(tagId, newTagName, $cordovaSQLite, callback) {
  var sql_update_tag = 'UPDATE tag SET name ="' +newTagName+ '" WHERE id = '+tagId;

  console.log("Database - Update Tag");
  $cordovaSQLite.execute(db, sql_update_tag)
    .then(function (result) {
      return getAllTags($cordovaSQLite, callback);
    }, function (err) {
      alert('Cannot update tag');
      console.log(err);
    });

}

function addShow(show_id, name, date, day, time, repeat, channel, notes, show_overview, show_backdrop,tagList,notification_id, $cordovaSQLite, callback) {

  var sql_insert_show = 'INSERT INTO show (show_id, name, date, day, time, repeat, channel, notes, show_overview, show_backdrop, notification_id) VALUES ' +
                          '("'+show_id+'","'+name+'","'+date+'","'+day+'","'+time+'",'+repeat+','+channel+',"'+notes+'","'+show_overview+'","'+show_backdrop+'",'+notification_id+')';


  console.log("Database - Insert Show");
  $cordovaSQLite.execute(db, sql_insert_show)
    .then(function (result) {
      var insertId = result.insertId;
      if (tagList.length != 0)
        return addTagsToShow(insertId, tagList,$cordovaSQLite,callback);
      else
        callback(insertId);
    }, function (err) {
      alert('Cannot insert show');
      console.log(err);
    });

}

function deleteShow(showId, $cordovaSQLite, callback){
  var sql_delete_show = 'DELETE FROM show WHERE id = '+showId;
  var sql_delete_show_tag = 'DELETE FROM show_tag WHERE id_show = '+showId;

  return $cordovaSQLite.execute(db, sql_delete_show_tag)
    .then(function (result) {
      return $cordovaSQLite.execute(db, sql_delete_show)
        .then(function (result) {
          callback();
        }, function (err) {
          alert('Cannot delete show');
          console.log(err);
        });
    }, function (err) {
      alert('Cannot delete show_tag');
      console.log(err);
    });

}

function addTagsToShow(show_id, tagList, $cordovaSQLite, callback){
  var sql_insert_tag = "INSERT INTO show_tag ( id_show, id_tag) VALUES ";
  for(var i=0;i<tagList.length;i++){
    if (i == tagList.length -1){
      sql_insert_tag = sql_insert_tag + "("+show_id+", "+tagList[i].id+");"
    }
    else{
      sql_insert_tag = sql_insert_tag + "("+show_id+", "+tagList[i].id+"),"
    }
  }

  $cordovaSQLite.execute(db, sql_insert_tag)
    .then(function (result) {
      return callback(show_id);
    }, function (err) {
      alert('Cannot insert show_tag');
      console.log(err);
    });

}

  function DB_Test($cordovaSQLite)
  {

     var ins_tag1 = "INSERT INTO tag (name) VALUES ('comedy')";
     var ins_tag2 = "INSERT INTO tag (name) VALUES ('80s')";
     var ins_tag3 = "INSERT INTO tag (name) VALUES ('sitcom')";
     var ins_tag4 = "INSERT INTO tag (name) VALUES ('drama')";
     var ins_tag5 = "INSERT INTO tag (name) VALUES ('fox')";

     $cordovaSQLite.execute(db, ins_tag1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag2).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag3).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag4).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag5).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });



     var ins_show1 = "INSERT INTO show (name) VALUES ('The Big Bang Theory')";
     var ins_show2 = "INSERT INTO show (name) VALUES ('Law & Order: SUV')";
     var ins_show3 = "INSERT INTO show (name) VALUES ('Chicago PD')";
     var ins_show4 = "INSERT INTO show (name) VALUES ('The Simpsons')";
     var ins_show5 = "INSERT INTO show (name) VALUES ('Family Guy')";

     $cordovaSQLite.execute(db, ins_show1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_show2).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_show3).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_show4).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_show5).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

    /* */

     var ins_tag_show1_1 = "INSERT INTO show_tag (id_tag, id_show) VALUES (1, 2)";
     var ins_tag_show1_2 = "INSERT INTO show_tag (id_tag, id_show) VALUES (1, 4)";
     var ins_tag_show2_1 = "INSERT INTO show_tag (id_tag, id_show) VALUES (2, 5)";
     var ins_tag_show3_1 = "INSERT INTO show_tag (id_tag, id_show) VALUES (3, 5)";
     var ins_tag_show3_2 = "INSERT INTO show_tag (id_tag, id_show) VALUES (3, 6)";

     $cordovaSQLite.execute(db, ins_tag_show1_1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag_show1_2).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag_show2_1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag_show3_1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

     $cordovaSQLite.execute(db, ins_tag_show3_2).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     });

  }








