const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const timestamps = require("mongoose-timestamp");
const { BookTC } = require("./book");
const { UserTC } = require("./user");

const WordSchema = new Schema(
  {
    search_word: {
      type: String,
      required: true,
    },
    phonetic: {
      text: {
        type: String,
        trim: true,
      },
      audio: {
        type: String,
        trim: true,
        required: true,
      },
    },
    parts_of_speech: {
      type: String,
    },
    definitions: {
      type: [String],
      required: true,
    },
    example:{
      type:String
    },
    synonyms:{
      type:[String]
    },
    userIds: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        bookIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
          },
        ],
      },
    ],
  },
  {
    collection: "words",
  }
);

const customizationOptions = {};
WordSchema.plugin(timestamps);
const WordTC = composeWithMongoose(
  mongoose.model("Word", WordSchema),
  customizationOptions
);

WordTC.addRelation("users", {
  resolver: () => UserTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => {
      const userIds = source.userIds.map((user) => user.userId);
      return {
        _operators: {
          _id: {
            in: userIds || [],
          },
        },
      };
    },
  },
  projection: { userIds: true },
});

WordTC.addRelation("books", {
  resolver: () => BookTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => {
      const bookIds = source.userIds.reduce(
        (array, user) => array.concat(user.bookIds),
        []
      );
      return {
        _operators: {
          _id: {
            in: bookIds || [],
          },
        },
      };
    },
  },
  projection: { userIds: true },
});

module.exports = { Word: mongoose.model("Word", WordSchema), WordTC };
