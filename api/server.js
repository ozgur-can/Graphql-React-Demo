const typeDefs = require("./models/typeDefs");
const resolvers = require("./resolvers");

const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("Rick & Morty listening on 4000");
});
