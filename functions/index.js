const {https} = require("firebase-functions")
const admin = require('firebase-admin');
const { ApolloServer } = require('apollo-server-cloud-functions')

const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://logos-eros.firebaseio.com/"
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({
      headers: req.headers,
      req,
      res,
      admin
    })
})

exports.graphql = https.onRequest(server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
}
));
