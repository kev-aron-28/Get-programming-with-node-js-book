const http = require("http");
const fs = require("fs");
const statusCode = require("http-status-codes");

const sendErrorResponse = (res) => {
    res.writeHead(statusCode.NOT_FOUND, {
        "Content-type": "text/html"
    });

    res.write("<h1>Not found</h1>");
    res.end();
}

const customReadFile = (path, res) => {
    if(fs.existsSync(path)){
        fs.readFile(path, (err, data) => {
            if(err){
                console.log(err);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        })
    } else {
        sendErrorResponse(res);

    }
}

const app = http.createServer((req, res) => {
    let url = req.url;

    if(url.indexOf(".html") !== -1){
        res.writeHead(statusCode.OK, {
            "Content-Type": "text/html"
        })
        customReadFile(`./views${url}`, res);    
    }  else if(url.indexOf(".js") !== -1){
        res.writeHead(statusCode.OK, {
            "Content-Type": "text/javascript"
        })
        customReadFile(`./public/js${url}`, res);
    } else if(url.indexOf(".css") !== -1){
        res.writeHead(statusCode.OK, {
            "Content-Type": "text/css"
        })
        customReadFile(`./public/css${url}`, res);
    } else if(url.indexOf(".png") !== -1){
        res.writeHead(statusCode.OK, {
            "Content-Type": "image/png"
        })
        customReadFile(`./public/img${url}`, res);
    }
})


app.listen(3000);
console.log("App listening on port 3000");