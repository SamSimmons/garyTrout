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
	port: process.env.PORT || 3000,
	routes: { cors: true } 
});

server.register(Inert, function () {});

server.route({
	method: 'POST',
	path: '/delete',
	handler: function (req, reply) {
		var idToDelete = JSON.parse(req.payload)
		deleteOne('fish', idToDelete)
			.then(getAll)
			.then((data) => {
				reply(data)
			})
			.catch((err) => {
				console.error(err)
			})
			//.finally(closeDB)
	}
});

server.route({
	method: 'POST',
	path: '/add',
	handler: function (req, reply) {
		var newTrout = JSON.parse(req.payload)

		addTo('fish', newTrout)
			.then(getAll)
			.then((data) => {
				reply(data)
			})
			.catch((err) => {
				console.error(err)
			})
			//.finally(closeDB)
	}
})

server.route({
	method: 'GET',
	path: '/data',
	handler: function (req, reply) {
		getAll()
			.then((data) => {
				reply(data)
		})
			.catch((err) => {
				console.error(err)
			})
			//.finally(closeDB)
	}
});

// server.route({
// 	method:'GET',
// 	path: '/collection/{year}',
// 	handler: function(req, reply) {
// 		console.log(req.params.year)
// 		reply('linked')
// 	}
// })

server.route({
	method:'GET',
	path: '/data/{id}',
	handler: function(req, reply) {
		var troutID = req.params.id
		findOne('fish', troutID)
			.then((data) => {
				reply(data[0])
			})
			.catch((err) => {
				console.error(err)
			})
			//.finally(closeDB)
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

function getAll (){
	return knex.select().table('fish')
}

function getCollection(param) {
	return knex('fish').where(year)
}

function findOne (table, id) {
	return knex(table).where('id', id)
}

function deleteOne (table, id) {
	return knex(table).where('id', id).del()
}

function closeDB () {
  knex.destroy()
}