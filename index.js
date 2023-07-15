//jshint esversion:6
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import express from "express";
const app = express();

import bodyParser from "body-parser";


import { getdate } from "./date.js";
const date = getdate()
// import https from "https";

var items = [];
var workItem = []

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {

  // var today = new Date();
  // var options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  // };
  // var day = today.toLocaleDateString("en-us", options);

  var day = date

  res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", function (req, res) {

  let item = req.body.newItem;


  if (req.body.List === "Work") {
    workItem.push(item)
    res.redirect("/work");
  }
  else {

    items.push(item);
    res.redirect("/");

  }




});


app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItem: workItem });

})

// app.post("/work", function (req, res) {
//   let item = req.body.newItem
//   workItem.push(item)
//   res.redirect("/work")
// })


app.get("/about", function (req, res) {
  res.render("about")
})

app.listen(3000, function () {
  console.log("server start at 3000 localhost");
});
