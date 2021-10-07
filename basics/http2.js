const http = require("http");
const httpStatus = require("http-status-codes");
const port = 3000;
const app = http.createServer();

app.on("request", (req, res) => {
    let body = [];
    
    req.on("data", (bodyMessage) => {
        body.push(bodyMessage);
    })
    
    req.on("end" , () => {
        body = Buffer.concat(body).toString();
        console.log(`El body tiene ${body}`);
    })
    
    console.log(`Method: ${JSON.stringify(req.method)}`)
    console.log(`URL ${JSON.stringify(req.url)}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);

    res.writeHead(httpStatus.OK, {
        "Content-type" : "text/html"
    })
    
    let responseMessage = "<h1>Hi, I'm a new server </h1>";
    res.end(responseMessage);
} )


app.listen(port);

console.log("App listening on port 3000");
