const { WordTC } = require("../model/word");
require("../query/word.query");

const WordQuery = {
  wordById: WordTC.getResolver("findById"),
  wordByIds: WordTC.getResolver("findByIds"),
  wordOne: WordTC.getResolver("findOne"),
  wordMany: WordTC.getResolver("findMany"),
  wordCount: WordTC.getResolver("count"),
  wordsByUsersBook: WordTC.getResolver("findyByUsersBook"),
  //   wordConnection: WordTC.getResolver("connection"),
  //   wordPagination: WordTC.getResolver("pagination"),
};

const WordMutation = {
  wordCreateOne: WordTC.getResolver("createOne"),
  wordCreateMany: WordTC.getResolver("createMany"),
  wordUpdateById: WordTC.getResolver("updateById"),
  wordUpdateOne: WordTC.getResolver("updateOne"),
  wordUpdateMany: WordTC.getResolver("updateMany"),
  wordRemoveById: WordTC.getResolver("removeById"),
  wordRemoveOne: WordTC.getResolver("removeOne"),
  wordRemoveMany: WordTC.getResolver("removeMany"),
};

module.exports = { WordQuery, WordMutation };
