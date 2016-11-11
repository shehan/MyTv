/*
 Database Connection class
 */
var db = null;
function initDatabase($cordovaSQLite) {
  try {
    db = window.openDatabase("MyTV.db", '1.0', 'MyTV Database', 65536);

    var sql_tag = 'CREATE TABLE IF NOT EXISTS tag (' +
                    'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                    'name VARCHAR(50), ' +
                    'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                    'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP' +
                  ')';

    var sql_show = 'CREATE TABLE IF NOT EXISTS show (' +
                      'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                      'name VARCHAR(255), ' +
                      'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                      'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP' +
                    ')';

    var sql_show_tag = 'CREATE TABLE IF NOT EXISTS show_tag (' +
                          'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                          'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                          'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP,' +
                          'id_tag INTEGER NOT NULL, ' +
                          'id_show INTEGER NOT NULL, ' +
                          'FOREIGN KEY (id_tag) REFERENCES tag (id), ' +
                          'FOREIGN KEY (id_show) REFERENCES show (id)' +
                        ')';

    console.log("Database - Create Table - Tag");
    $cordovaSQLite.execute(db, sql_tag);

    console.log("Database - Create Table - Show");
    $cordovaSQLite.execute(db, sql_show);

    console.log("Database - Create Table - Show_Tag");
    $cordovaSQLite.execute(db, sql_show_tag);

  }
  catch(error){
    alert('Error Encountered During Database Init!');
    console.log(error);
  }




  function DB_Test()
  {
    /*
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

     */
    /*
     var ins_tag_show1_1 = "INSERT INTO show_tag (id_tag, id_show) VALUES (1, 2)";
     var ins_tag_show1_2 = "INSERT INTO show_tag (id_tag, id_show) VALUES (1, 4)";
     var ins_tag_show2_1 = "INSERT INTO show_tag (id_tag, id_show) VALUES (2, 5)";
     var ins_tag_show3_1 = "INSERT INTO show_tag (id_tag, id_show) VALUES (3, 5)";
     var ins_tag_show3_2 = "INSERT INTO show_tag (id_tag, id_show) VALUES (3, 6)";

     $cordovaSQLite.execute(db, ins_tag_show1_1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     })

     $cordovaSQLite.execute(db, ins_tag_show1_2).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     })
     $cordovaSQLite.execute(db, ins_tag_show2_1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     })
     $cordovaSQLite.execute(db, ins_tag_show3_1).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     })
     $cordovaSQLite.execute(db, ins_tag_show3_2).then(function(res) {
     console.log("INSERT ID -> " + res.insertId);
     }, function (err) {
     console.error(err);
     })
     */
  }


/*
    function (db) {

    db.transaction(function (tx) {

      console.log("Database - Create Table - Tag");
      tx.executeSql('CREATE TABLE IF NOT EXISTS tag (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'name VARCHAR(50), ' +
        'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
        'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP' +
        ')');

      console.log("Database - Create Table - Show");
      tx.executeSql('CREATE TABLE IF NOT EXISTS show (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'name VARCHAR(255), ' +
        'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
        'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP' +
        ')');

      console.log("Database - Create Table - Show_Tag");
      tx.executeSql('CREATE TABLE IF NOT EXISTS show_tag (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'id_tag INTEGER, ' +
        'id_show INTEGER' +
        'created_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
        'modified_on DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
        'FOREIGN KEY(id_tag) REFERENCES tag (id)), ' +
        'FOREIGN KEY(id_show) REFERENCES show (id))');

    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });

  }, function (error) {
    console.log('Open database ERROR: ' + JSON.stringify(error));
  });
*/

}



