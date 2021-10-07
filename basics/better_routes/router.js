const http = require("http");
const httpStatus = require("http-status-codes");

const routes = {
    "GET": {
        "/info" : (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Conten-Type" : "text/plain"
            })
            res.end("INFO PAGE")
        },
        "/index" : (req, res) => {
            res,writeHead(httpStatus.OK, {
                "Conten-Type" : "text/plain"
            })
            res.end("Info page")
        },
        "/contact" : (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Conten-Type" : "text/plain"
            })
            res.end("Conctact")
        }
    },

    "POST":{},
}


exports.handle = (req, res) => {
    try{
        if(routes[req.method][req.url]){
            routes[req.method][req.url](req, res);
        } else{
            res.writeHead(httpStatus.NOT_FOUND, {
                "Content-Type" : "text/html"
            })
            res.end("NO SUCH FILE EXISTS")
        }
    } catch(err) {
        console.log("Error " + err);
    }
}

exports.get = (url, action) => {
    routes["GET"][url] = action
}

exports.post = (url, action) => {
    routes["POST"][url] = action
}