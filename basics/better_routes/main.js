const http = require("http");
const fs = require("fs");
const httpStatus = require("http-status-codes");
const router = require("./router");

const plainText = {
    "Content-Type" : "plain/text"
}

const HTML = {
    "Content-Type" : "text/html"
}



const readcustomfile = (file, res) => {
    fs.readFile(`./views/${file}`, (err, data) => {
        if(err) console.log("Error ", err);

        res.end(data);
    })
}   


router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, HTML);
    res.end("INDEX");
})


router.get("/index.html", (req, res) => {
    res.writeHead(httpStatus.OK, HTML);
    readcustomfile("index.html", res);

})

router.get("/about.html", (req, res) => {
    res.writeHead(httpStatus.OK, HTML);
    readcustomfile("about.html", res);
})

http.createServer(router.handle).listen(3000);

console.log("App listening on port 3000");


