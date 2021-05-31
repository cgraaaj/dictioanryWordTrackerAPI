const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
// const { graphqlHTTP } = require("express-graphql");
const { ApolloServer } = require("apollo-server-express");
const graphqlSchema = require("./schemas/index");
// const logger = require("./core/logger");

// const extensions = ({ context }) => {
//   return {
//     runTime: Date.now() - context.startTime,
//   };
// };

const app = express();
app.use(cors());
const server = new ApolloServer({
  schema: graphqlSchema,
  cors: true,
  path: "/",
});
server.applyMiddleware({ app, path: "/", cors: true });

app.listen(5000, async () => {
  console.log("server is running ", 5000);
  await mongoose.connect(
    "mongodb+srv://velan_mongodb:Raju6713@cluster0.64cqd.mongodb.net/wordTracker?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
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
