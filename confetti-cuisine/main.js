const express = require("express");
const app = express();
const router = require("./routes/index");
const layouts = require("express-ejs-layouts");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");
const User = require("./models/user");

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.urlencoded({

    extended:false
}))
app.use(express.json());
app.set("port", process.env.PORT || 3001);
app.set("token", process.env.TOKEN || "recipeT0k3n");

app.use(express.static("public"));
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use(cookieParser("secret_passcode"));
app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 400000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next(); 
})



const MongoDb = require("mongodb").MongoClient,
      dbURL = "mongodb://localhost:27017",
      dbName = "node_book";


MongoDb.connect(dbURL, (error, client) => {
    if(error) throw error;
    let db = client.db(dbName);
})


const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/node_book",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }
);
const db = mongoose.connection;
mongoose.Promise = global.Promise;


db.once("open", () => {
    console.log("Succesfully connected to MongoDB with mongoose");
});


// let user1 = new Subscriber({
//     name: "tapia Cruz",
//     email:"tap_29@hooli.com",
//     zipCode: 56123,
// });

// user1.save((error, savedDoc) => {
//     if(error) console.log(error)
//     console.log(savedDoc);


// })

// let myQuery = Subscriber.findOne({
//     name:"tapia Cruz"
// })

// myQuery.exec((error, data) => {
//     if(data) console.log(data.name)
// })


app.use("/", router);

const server = app.listen(app.get("port"), () => {
    console.log("App listening on port 3001");
}),
    io = require("socket.io")(server);
require("./controllers/chatController")(io); 
