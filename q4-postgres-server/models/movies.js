var pg = require('pg');
var databaseFile = process.env.DATABASE_URL || 'postgres://gracehopper:buyer-lumen-local-centaur@exam1db.cpsc213.io/exam1';
var db = new pg.Client(databaseFile);
var db = new pg.Client(databaseFile);

db.connect()

function getAllMovies(callback) {
  db.query("SELECT title FROM movies", callback);
}

function searchByTitle(searchString, callback){
  var query = "SELECT title FROM movies WHERE title = '" + searchString + "';";
  db.query(query, callback);
}

//query.on('end', () => { db.end(); });

module.exports = {
  getAllMovies: getAllMovies,
  searchByTitle: searchByTitle
};
