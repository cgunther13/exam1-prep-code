'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Handlebars = require('handlebars');

// Create a server with a host and port
const server = new Hapi.Server();

// Add template rendering support to Hapi
server.register(Vision, function(err) {
  if(err) {
    console.log('Cannot register vision');
  }
  // Register handlebars module as engine responsible for rendering templates
  // with an extension of .html
  server.views({
    engines: {
        html: Handlebars
    },
    // Templates located in views directory within the current path
    path: __dirname + '/views',
    layout: "movies"
  });
});

server.connection({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8000
});

// Listen for HTTP requests and accept incoming data through an API
// ie: POST to ‘/reviews’ {title: “superman”, review: 5} will save that review
const movies = [];
server.route({
  method: ['POST', 'GET'],
  path: '/',
  handler: function(request, reply) {
    if (request.method === 'post') {
      const title = request.payload.title;
      const review = request.payload.review;
      const newMovie = {
        title: title,
        review: review
      };
      movies.push(newMovie);
      console.log('added ', newMovie);
    }
    reply.view('movies', { movies: movies });
  }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
