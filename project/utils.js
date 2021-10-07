const fs = require("fs");
const httpStatus = require("http-status-codes");
const contenTypes = require("./contentTypes.js");


module.exports = {
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (err, data) => {
            if(err){
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contenTypes.html);
                res.end("There was an error");
            }

            res.end(data);
        })
    }
}
