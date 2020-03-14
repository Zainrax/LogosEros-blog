const { gql } = require("apollo-server-cloud-functions")

const typeDefs = gql`
  scalar Date
  
  type post {
    title: String!
    description: String
    date: Date
    content: String!
  }

  type project {
    title: String!
    description: String!
    date: Date
    github: String
    website: String
  }

  type Query { 
    posts: [post]!
    projects: [project]! 
  }

  input newPost {
    title: String!
    description: String
    date: Date
    content: String!
  }

  type Mutation {
    post(input: newPost!): post!
  }
`

module.exports = {
  typeDefs
}
