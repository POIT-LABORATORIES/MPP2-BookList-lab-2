const express = require("express");
const exphbs = require("express-handlebars");
const items = require("./storage");

const app = express();

// Handlebars middleware.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

// Body parser middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Book List",
        items
    });
});

app.use("/api/members", require("./routes/api/items"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listening on " + port));