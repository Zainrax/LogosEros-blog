const { GraphQLScalarType } = require('graphql')

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return new Date(value) // value from the client
    },
    serialize (value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    }
  }),
  Query: {
    posts: (_,__,{admin}) =>
      admin
        .database()
        .ref('posts')
        .once('value')
        .then(snap => snap.val())
        .then(val => Object.keys(val).map(key => val[key])),
    projects: (_,__, {admin}) =>
      admin
    .database()
    .ref('projects')
    .once('value')
    .then(snap => snap.val())
    .then(val => Object.keys(val).map(key => val[key])),
  },
    Mutation: {
      post: (_, {input}, {admin}) =>  {
        admin
      .database()
      .ref('posts/' + input.title.toLowerCase().replace(/\s/g, "-"))
      .set(input)
      return input
    }
  }
}
  

module.exports = {
  resolvers
}
