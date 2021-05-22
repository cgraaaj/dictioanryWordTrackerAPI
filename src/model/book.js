const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    isbn_13: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    authors: {
      type: [String],
    },
    image_url:{
      type: String,
    },
    info:{
      type: String,
    },
    description:{
      type: String,
    }
  },
  {
    collection: "books",
  }
);

BookSchema.plugin(timestamps);

const customizationOptions = {};
const BookTC = composeWithMongoose(
  mongoose.model("Book", BookSchema),
  customizationOptions
);

module.exports = {
  BookSchema,
  Book: mongoose.model("Book", BookSchema),
  BookTC,
};
