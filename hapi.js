'use strict';
var fs = require('fs')

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
	port: 3001,
	routes: { cors: true } 
});

server.route({
	method: 'POST',
	path: '/add',
	handler: function (req, reply) {
		fs.readFile('./data.json', (err, data) => {
			if (err) {console.error(err)}

			var arrayOfTrout = JSON.parse(data)
			var newTrout = JSON.parse(req.payload)
			console.log('payload', newTrout)
			arrayOfTrout.push(newTrout)
			console.log('arr', arrayOfTrout)
			reply(arrayOfTrout)

			fs.writeFile('./data.json', JSON.stringify(arrayOfTrout), (err) => {
				if (err) {
					console.error(err)
				}
				// console.log('replying')
			})
		})
	}
})

server.route({
	method: 'GET',
	path: '/',
	handler: function (req, reply) {
		fs.readFile('./data.json', (err, data) => {
			if(err) {console.err}

			reply(data)
		})
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function (req, reply) {
		
		reply('Hello, ' + encodeURIComponent(req.params.name) + '!');
	}
})

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at: ', server.info.uri);
})