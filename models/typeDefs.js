const { gql } = require("apollo-server");

const typeDefs = gql`
  type Character {
    id: Int!
    name: String
    species: String
    status: String
  }

  type Query {
    character(id: ID!): Character
  }
`;

module.exports = typeDefs;
