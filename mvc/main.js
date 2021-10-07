const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const homeController = require('./controllers/homeController');
const errorController = require("./controllers/errorController");


app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.set("view engine", "ejs");
app.use(layouts);
app.use(errorController.logErrors);
app.use(errorController.respondNoSourceFound);
app.use(errorController.respondInternalError);

app.get("/item/:vegetable", homeController.sendReqParam);
app.get("/name/:myname", homeController.name);
app.get("/about", (req, res) => {
    res.render("about");
})

app.post("/sign_up", homeController.userSignUpProcessor );


app.listen(3000, () => {
    console.log("app listening 3000");
});