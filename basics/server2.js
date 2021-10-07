const PORT = 3000;
const http = require("http");
const statusCode = require("http-status-codes");
const fs = require("fs");

const getUrl = (url) => {
    return `views${url}.html`
}


const app = http.createServer((req, res) => {
    const url = getUrl(req.url);

    fs.readFile(url, (err, data) => {
        if(err) {
            res.writeHead(statusCode.NOT_FOUND);
            res.write("<h1>Not found</h1>");
        } else {
            res.writeHead(statusCode.OK, {
                "Content-type": "text/html"
            })

            console.log(req.url);
            res.write(data);
        }
        
        res.end();
    })
})

app.listen(PORT);

console.log("App listening on port 3000");
