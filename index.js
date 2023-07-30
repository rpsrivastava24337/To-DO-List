//jshint esversion:6
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

////////////////////////////////////////mongooooooooooooooooooos///////////////////////
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true })


const itemSchema = {
  name: String,

};
const Item = mongoose.model("Item", itemSchema);

const Item1 = new Item({
  name: "Welcome to ToDo-List"
})

const Item2 = new Item({
  name: "create new item +  "
})
const Item3 = new Item({
  name: "and hit to <--- delete"
})

const defaultItems = [Item1, Item2, Item3]
async function additem(){
  await Item.insertMany(defaultItems)
}



let a = await Item.find({})




//////////////////////////////////////////expressssssssssssssss/////////////////////
import express from "express";
const app = express();
////////////////////////////////////////bodyparserrrrrrrrrrrrr//////////////////////
import bodyParser from "body-parser";


// import { getdate } from "./date.js";
// const date = getdate()


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
  // var day = date


  if (a === 0) {
    additem()
    res.redirect("/")
  }
  else {
    res.render("list", { listTitle: "Today", newListItem: a });
  }



});

app.post("/", function (req, res) {

  let item = req.body.item;


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
