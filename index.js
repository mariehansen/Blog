import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var blog = "";
var title = "";
//Test data
//var postTitles = ["9 September", "10 September", "11 September"];
//var allPosts = ["Programming every day!", "Fun times", "Work Hard"];
var postTitles = [];
var allPosts = [];
var number = -1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Get requests for each site
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/view", (req, res) => {
  res.render("view.ejs", {
    allPosts: allPosts,
    postTitles: postTitles,
  });
});

// Process request to SUBMIT a new post
app.post("/submitPost", (req, res) => {
  blog = req.body.blogPost.replaceAll("\n", "<br />\r\n");
  title = req.body.blogTitle;
  //console.log("POST: " + blog);
  allPosts.push(blog);
  postTitles.push(title);
  res.redirect("/view"); //Change to view later
});

// Process request to DELETE a post
app.post("/view", (req, res) => {
  let number = req.body.delete;

  allPosts = removeArray(allPosts, number);
  postTitles = removeArray(postTitles, number);

  res.render("view.ejs", {
    allPosts: allPosts,
    postTitles: postTitles,
  });
});

function removeArray(array, number) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (i != number) {
      newArray.push(element);
    }
  }
  return newArray;
}

// Process request to VIEW EDITING post
app.post("/edit", (req, res) => {
  let number = req.body.edit;

  res.render("edit.ejs", {
    allPosts: allPosts,
    postTitles: postTitles,
    number: number,
  });
});

// Process request to SUBMIT EDIT of post
app.post("/editPost", (req, res) => {
  blog = req.body.blogPost.replaceAll("\n", "<br />\r\n");
  title = req.body.blogTitle;
  number = req.body.number;

  if (number != -1) {
    allPosts[number] = blog;
    postTitles[number] = title;
  }
  res.redirect("/view");
});

app.get("/:universalURL", (req, res) => {
  res.render("error.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
