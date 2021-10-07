const http = require("http");
const httpStatus = require("http-status-codes");
const port = 3000;

const routes = {
    "/info" : "<h1>Our info</h1>",
    "/contact" : "<h1>Contact us</h1>",
    "/error" : "<h1>Error</h1>",
}

const app = http.createServer((req, res) => {
    res.writeHead(httpStatus.OK, {
        "Content-type": "text/html"
    })

    console.log(req.headers);
    
    if(routes[req.url]){
        setTimeout(() => {
            res.write(routes[req.url]);
            res.end();     
        }, 2000);
       
    } else if(req.url === "/error"){
        res.writeHead(404, {
            "Content-type": "text/html"
        })
        res.write(routes[req.url]);
        res.end(); 
    }else {
        let defaultMessage = "<h1>Welcome</h1>"
        res.write(defaultMessage);
    }

    
} )


app.listen(port);
console.log(`App listening on port ${port}`)