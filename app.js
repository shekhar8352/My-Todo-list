//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

let tasks = ["Wake up", "Exercise", "Have breakfast"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res){

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newListItems: tasks
  });

  app.post("/", function(req, res){
    let item = req.body.newItem;
    tasks.push(item);
    res.redirect("/");
  });

});

app.listen("3000", function() {
  console.log("Server is listening at port 3000");
});
