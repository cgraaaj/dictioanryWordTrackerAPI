const { WordTC, Word } = require("../model/word");
const resolver = function () {};
resolver.wordsByUsersBook = WordTC.addResolver({
  name: "findyByUsersBook",
  type: [WordTC],
  args: { userId: "String", bookId: "String" },
  resolve: async ({ source, args }) => {
    let words = Word.find(
      {
        userIds: { $elemMatch: { userId: args.userId, bookIds: args.bookId } } ,
      },
      function (err, words) {
        if (err) {
          console.log(err);
          return err;
        }
        if (words) {
          return words;
        }
      }
    );
    return await words;
  },
});

module.exports = resolver;
