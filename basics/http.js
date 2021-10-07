const http = require("http");
      httpStatus = require("http-status-codes");
      app = http.createServer((request, response) =>{
            console.log("Recived a request");
            response.writeHead(httpStatus.OK, {
                "Content-type": "text/html"
            })

            let responseMessage = ("<h1>Hello world</h1>");
            response.write(responseMessage);
            response.end();
            console.log(`Sent a response : ${responseMessage}`);
      })

      app.listen(3000);
      console.log("Server listening on port 3000")