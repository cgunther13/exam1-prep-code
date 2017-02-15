'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        return reply('Hello')
    }
});

server.route({
    method: 'GET',
    path: '/welcome',
    handler: function(request, reply) {
        return reply('Welcome to my website!')
    }
});
