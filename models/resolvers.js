const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("database/rick-and-morty.json");
const db = low(adapter);

const resolvers = {
  Query: {
    character: (_, args) => db.get("results").__wrapped__.results[args.id - 1]
  }
};

module.exports = resolvers;
