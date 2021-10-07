const httpStatus = require("http-status-codes");
const utils = require("./utils.js");
const contentTypes = require("./contentTypes");

const routes = {
    'GET':{
        "/main": (req, res) => {
            res.writeHead(200, contentTypes.html);
            res.end("MAIN");
        }
    },
    'POST':{}
}

//Nueva palabra
const handle = (req, res) => {
    try{
        routes[req.method][req.url](req, res);
    } catch(e){
        res.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile("views/error.html", res);
    }
}


const get = (url, action) => {
    routes["GET"][url] = action;
}

const post = (url, action) => {
    routes["POST"][url] = action;
}


module.exports = {
    handle, 
    get,
    post
}
