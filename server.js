if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const mongoose = require("mongoose");
// const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const graphqlSchema = require("./src/schemas/index");
// const logger = require("./core/logger");

// const extensions = ({ context }) => {
//   return {
//     runTime: Date.now() - context.startTime,
//   };
// };

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const server = new ApolloServer({
  schema: graphqlSchema,
  cors: true,
  path: "/",
});
server.applyMiddleware({ app, path: "/", cors: true });

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;
// local server
//const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
// Atlas mongodb
const url =`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  connectTimeoutMS: 10000,
};

app.listen(3005,() => {
  console.log("server is running ", 3005);
  mongoose
    .connect(url, options)
    .then(function () {
      console.log("MongoDB is connected");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// app.use(
//   "/graphql",
//   graphqlHTTP((request) => {
//     return {
//       context: { startTime: Date.now() },
//       graphiql: true,
//       schema: graphqlSchema,
//       extensions,
//     };
//   })
// );
