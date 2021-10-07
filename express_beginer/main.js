const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("A req was made to ", req.url);
    next();
})

app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.body);
    console.log(req.query)
    res.send("POST successfully");
})

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST successfully");
})

app.listen(3000, () => {
    console.log("App listening on port 3000");
})