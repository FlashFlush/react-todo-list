const express = require("express");
const bodyParserGraph = require("body-parser-graphql");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");

const appSchema = require("./schema/schema");
const resolver = require("./resolvers/resolvers");

const app = express();
const connectionString = process.env.MONGO_CONNECTION_STRING; //Replace with a connection String to a mongoDB server
const PORT = 8080;

app.use(bodyParserGraph.graphql());

app.use((req, res, next) => {
  console.log(getCurrentTime() + " => " + req.hostname + " -- " + req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: appSchema,
    rootValue: resolver,
    graphiql: true
  })
);

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    console.log(`Server is running, listening on port: ${PORT}`);
    app.listen(PORT);
  })
  .catch(e => {
    console.log("ERROR CONNECTING TO THE DB");
    console.log(e);
  });

/**
 * Get the current time for debugging and logging purposes
 */
getCurrentTime = () => {
  let dt = new Date();
  let month = dt.getMonth() + 1;
  let day = dt.getDate() + 1;
  let year = dt.getFullYear();
  let h = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
  let m = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
  let s = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();
  return day + "/" + month + "/" + year + "  " + h + ":" + m + ":" + s;
};
