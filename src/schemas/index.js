const { schemaComposer } = require("graphql-compose");

const { UserQuery, UserMutation } = require("./user");
const { BookQuery, BookMutation } = require("./book");
const { WordQuery, WordMutation } = require("./word");

schemaComposer.Query.addFields({
  ...UserQuery,
  ...BookQuery,
  ...WordQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...BookMutation,
  ...WordMutation,
});

module.exports = schemaComposer.buildSchema();
