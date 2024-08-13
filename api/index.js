var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();
var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://snehabiswasuemkcs2023:0sg9pMfpJj6ugM7l@cluster0.cfut6gv.mongodb.net/";

var databasename = "todoappdb";
var database;

app.listen(5038, () => {
  MongoClient.connect(process.env.DB_URL, (error, client) => {
    database = client.db(databasename);
    console.log("DB Connection Successful");
  });
});

app.get("/api/todoapp/getNotes", (request, response) => {
  database
    .collection("todoappcollection")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.post("/api/todoapp/addNotes", multer().none(), (request, response) => {
  database
    .collection("todoappcollection")
    .count({}, function (error, noOfDocs) {
      database.collection("todoappcollection").insertOne({
        id: (noOfDocs + 1).toString(),
        description: request.body.newNotes,
      });
      response.json("Added Successfully");
    });
});

app.delete("/api/todoapp/deleteNotes", (request, response) => {
  database.collection("todoappcollection").deleteOne({
    id: request.query.id,
  });
  response.json("Deleted successfully");
});
