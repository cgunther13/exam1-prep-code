'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Handlebars = require('handlebars');

var moviesControllers = require('./controllers/movies.js');

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
        // Templates are located in templates directory within the current path
        path: __dirname + '/views',
        layout: "movies"
    });
});

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000
});

// SQL queries
server.route({
    method: 'GET',
    path: '/movies',
    handler: moviesControllers.listMovies
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
