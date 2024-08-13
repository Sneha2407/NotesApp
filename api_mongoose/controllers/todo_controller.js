var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Todo = require("../model/todoSchema");

/*
// How to save something to DB
var ItemOne = Todo({item:'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
})

*/

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/api/todoapp/getNotes", async (req, res) => {
    try {
      // Fetch all items from the database
      const data = await Todo.find({});
      return res.status(200).json({
        todo: data,
      });
    } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).send("An error occurred while fetching the notes.");
    }
  });

  app.post("/api/todoapp/addNotes", urlencodedParser, function (req, res) {
    //get data from the veiw and add it to mongodb

    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
    //data.push(req.body);
  });

  app.delete("/api/todoapp/deleteNotes", function (req, res) {
    //delete the requested item from db

    Todo.find({ item: req.query.id }).remove(function (err, data) {
      console.log(req.params.item);
      if (err) throw err;
      res.json(data);
    });
  });
};
