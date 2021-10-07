const PORT = 3000;
const http = require("http");
const fs = require("fs");

const routes = {
    "/" : "./views/index.html",
    "/info" : "./views/info.html"
}

const app = http.createServer((req, res) => {

    res.writeHeader(200, {
        "Content-type" : "text/html"
    })

    if(routes[req.url]){
        fs.readFile(routes[req.url], (err, data) => {
            res.write(data);
            res.end();
        });
    } else {
        res.end("<h1>Not found</h1>");
    }
})

app.listen(PORT);

console.log("App listening on port 3000");