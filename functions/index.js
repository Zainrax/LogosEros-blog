const {gqlServer} = require('./graphql/server');
const {https} = require( 'firebase-functions');
const server = gqlServer();
const api = https.onRequest(server);

exports.graphql = api
