'use strict';
var fs = require('fs')

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
	port: 3001,
	routes: { cors: true } 
});

server.route({
	method: 'GET',
	path: '/',
	handler: function (req, res) {
		fs.readFile('./data.json', (err, data) => {
			if(err) {console.err}

			res(data)
		})
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function (req, res) {
		
		res('Hello, ' + encodeURIComponent(req.params.name) + '!');
	}
})

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at: ', server.info.uri);
})