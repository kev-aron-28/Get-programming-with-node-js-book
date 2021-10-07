const PORT = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const router = require("./router.js");
const httpStatus = require("http-status-codes");



const contentTypes = require("./contentTypes");
const utils = require("./utils");


router.get('/', (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/index.html", res);
})


http.createServer(router.handle).listen(PORT);

console.log("App listening on port 3000");
