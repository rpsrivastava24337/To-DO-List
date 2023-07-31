//jshint esversion:6
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//////////////////////////////////////////expressssssssssssssss/////////////////////
import express from "express";
const app = express();
////////////////////////////////////////bodyparserrrrrrrrrrrrr//////////////////////
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


// import { getdate } from "./date.js";
// const date = getdate()



////////////////////////////////////////mongooooooooooooooooooos///////////////////////
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true })


const itemSchema = {
  name: String,

};
const Item = mongoose.model("Item", itemSchema);

const Item1 = new Item({
  name: "1"
})

const Item2 = new Item({
  name: "2"
})
const Item3 = new Item({
  name: "3"
})

const defaultItems = [Item1, Item2, Item3]

async function additem() {
  
}

  

/////////
// var items = [];
// var workItem = []

app.get("/",async function (req, res) {
  let allitem = await Item.find({})
  if (allitem.length === 0) {
  await Item.insertMany(defaultItems)
  res.redirect("/")
  }
  else {

    res.render("list", { listTitle: "Today", newListItem: allitem });
  }
});
app.post("/", async function (req, res) {

  let itemname = req.body.item;

  const item = new Item({
    name: itemname
  })
  item.save()
  res.redirect('/')
});



app.post("/delete",async function(req,res){
const checkedItemId = req.body.checkbox
await Item.deleteOne({ _id:checkedItemId });
res.redirect("/")
})
// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work", newListItem: workItem });
// })

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
