'use strict';
var fs = require('fs')
var Path = require('path')
var _ = require('lodash')
var Inert = require('inert')
var knexConfig = require('./src/knexfile.js')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const Hapi = require('hapi');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
	port: 3001,
	routes: { cors: true } 
});

server.register(Inert, function () {});

server.route({
	method: 'POST',
	path: '/delete',
	handler: function (req, reply) {
		var idToDelete = parseInt(JSON.parse(req.payload))
		deleteOne('fish', idToDelete)
			.then((data) => {
				reply(idToDelete + ' Deleted')
			})
	}
});

server.route({
	method: 'POST',
	path: '/add',
	handler: function (req, reply) {
		var newTrout = JSON.parse(req.payload)

		addTo('fish', newTrout).then(
			reply(newTrout)
		)
	}
})

server.route({
	method: 'GET',
	path: '/data',
	handler: function (req, reply) {
		getAll('fish').then((data) => {
			reply(data)
		})
	}
});

server.route({
	method:'GET',
	path: '/data/{id}',
	handler: function(req, reply) {
		var troutID = parseInt(req.params.id)
		findOne('fish', troutID)
			.then((data) => {
				reply(data[0])
			})
	}
})

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at: ', server.info.uri);
})


function addTo (table, obj) {
  return knex(table).insert(obj)
}

function getAll (table){
	return knex.select().table(table)
}

function findOne (table, id) {
	return knex(table).where('id', id)
}

function deleteOne (table, id) {
	return knex(table).where('id', id).del()
}
