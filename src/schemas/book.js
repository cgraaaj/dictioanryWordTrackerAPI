const { BookTC } = require("../model/book");

const BookQuery = {
  bookById: BookTC.getResolver("findById"),
  bookByIds: BookTC.getResolver("findByIds"),
  bookOne: BookTC.getResolver("findOne"),
  bookMany: BookTC.getResolver("findMany"),
  bookCount: BookTC.getResolver("count"),
  // bookConnection: BookTC.getResolver("connection"),
  // bookPagination: BookTC.getResolver("pagination"),
};

const BookMutation = {
  bookCreateOne: BookTC.getResolver("createOne"),
  bookCreateMany: BookTC.getResolver("createMany"),
  bookUpdateById: BookTC.getResolver("updateById"),
  bookUpdateOne: BookTC.getResolver("updateOne"),
  bookUpdateMany: BookTC.getResolver("updateMany"),
  bookRemoveById: BookTC.getResolver("removeById"),
  bookRemoveOne: BookTC.getResolver("removeOne"),
  bookRemoveMany: BookTC.getResolver("removeMany"),
};

module.exports = { BookQuery: BookQuery, BookMutation: BookMutation };
