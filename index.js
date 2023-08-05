//jshint esversion:6
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import _ from "lodash";

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
//import  render  from "ejs";
mongoose.connect("mongodb+srv://admin-rps:rps24337@cluster0.nplzrd4.mongodb.net/todolistDB", { useNewUrlParser: true })


const itemSchema = {
  name: String,

};
const Item = mongoose.model("Item", itemSchema);

const Item2 = new Item({
  name: "Welcome"
})
const defaultItems = [Item2]

const listSchema = {
  name: String,
  items: [itemSchema]
}
const List = mongoose.model("List", listSchema);



/////////
// var items = [];
// var workItem = []

app.get("/", async function (req, res) {
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
  let listName = req.body.List;
  const item = new Item({
    name: itemname
  })
  if (listName == "Today") { // for root route
    item.save()
    res.redirect('/')
  }
  else {
    let nameOfList = await List.findOne({ name: listName }) // if other than root route then push item.
    nameOfList.items.push(item)
    nameOfList.save()
    res.redirect("/" + listName)
  }
});

app.post("/delete", async function (req, res) {
  const checkedItemId = req.body.checkbox
  const listname = req.body.listName
  if (listname === "Today") {
    await Item.deleteOne({ _id: checkedItemId });
    res.redirect("/")
  }
  else {
    await List.findOneAndUpdate({ name: listname }, { $pull: { items: { _id: checkedItemId } } })
    res.redirect("/" + listname)
  }

})
// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work", newListItem: workItem });
// })

// app.post("/work", function (req, res) {
//   let item = req.body.newItem
//   workItem.push(item)
//   res.redirect("/work")
// })

app.get("/:customlistname", async function (req, res) {// custom list input through user
  const customname = _.capitalize(req.params.customlistname)
  let matchitem = await List.findOne({ name: customname })

  if (!matchitem) { // if there is no custom name match then creat one
    const list = new List({
      name: customname,
      items: defaultItems
    });
    list.save()
    res.redirect("/" + customname)
  }
  else { // else just show  it
    res.render("list", { listTitle: customname, newListItem: matchitem.items })
  }
})
app.get("/about", function (req, res) {
  res.render("about")
})

app.listen(3000, function () {
  console.log("server start at 3000 localhost");
});
