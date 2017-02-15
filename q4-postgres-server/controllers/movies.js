var moviesModels = require('../models/movies.js');

function listMovies(request, reply){
 var callback = function(err, result){
   if (err){
     reply(err).code(500);
   }
   reply.view('movies', { movies: result.rows });
 }

 if (request.query.search) {
   moviesModels.searchByTitle(request.query.search, callback);
 } else{
   moviesModels.getAllMovies(callback);
 }
}

module.exports = {
 listMovies: listMovies
}
