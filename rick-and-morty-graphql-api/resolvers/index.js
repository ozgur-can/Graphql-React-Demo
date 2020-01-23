const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const dbPath = "./database/rick-and-morty.json";
const adapter = new FileSync(dbPath);
const db = low(adapter);

const resolvers = {
  Query: {
    character: (_, args) => db.get("results").__wrapped__.results[args.id - 1],
    characters: () => {
      let arr = [];
      db.get("results").__wrapped__.results.forEach(element => {
        arr.push(element);
      });
      return arr;
    },
    charactersByGender: (_, args) => {
      let arr = [];
      db.get("results").__wrapped__.results.forEach(element => {
        if (element.gender === args.gender) arr.push(element);
      });
      return arr;
    }
  }
};

module.exports = resolvers;
