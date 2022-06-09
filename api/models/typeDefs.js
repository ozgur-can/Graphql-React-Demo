const { gql } = require("apollo-server");

const typeDefs = gql`
  type Character {
    id: Int!
    name: String
    species: String
    status: String
    gender: String
    image: String
    location: Location
  }

  type Location {
    name: String
    url: String
  }

  type Query {
    character(id: ID!): Character
    characters: [Character]
    charactersByGender(gender: String!): [Character]
  }
`;

module.exports = typeDefs;
