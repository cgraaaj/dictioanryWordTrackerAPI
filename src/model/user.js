const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;
const { BookTC } = require("./book");

const UserSchema = new Schema(
  {
    guserId: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    image_url:{
      type: String,
    },
    bookIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    collection: "users",
  }
);
UserSchema.plugin(timestamps);

const customizationOptions = {};
const UserTC = composeWithMongoose(
  mongoose.model("User", UserSchema),
  customizationOptions
);

UserTC.addRelation("books", {
  resolver: () => BookTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => {
      console.log(source)
      return {_operators: {
        _id: {
          in: source.bookIds || [],
        },
      },}
    },
  },
  projection: { bookIds: true },
});

module.exports = {
  UserSchema,
  User: mongoose.model("User", UserSchema),
  UserTC,
};
