const { gql } = require("apollo-server-express")

const typeDefs = gql`
  scalar Date
  
  type post {
    title: String!
    description: String
    date: Date
    content: String!
  }

  type Query { 
    posts: [post]
  }
`

module.exports = {
  typeDefs
}
