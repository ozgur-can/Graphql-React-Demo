const typeDefs = require("./models/typeDefs");
const resolvers = require("./models/resolvers");

const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("Rick&Morty listening on 4000");
});

// TODO: graphql scheması olustur ve jsona bu model aracılığıyla crud işlem yaptır
// TODO: 1-2 model olustur => benawad'in model yapılarına bak
