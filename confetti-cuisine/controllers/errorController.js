
module.exports ={
    pageNotFoundError : (req, res) => {
        let code = 404;
        res.status(code);
        res.render("error");
    },

    internalServerError : (err, req , res , next) => {

        let code = 500;
        console.log("ERROR ocurred :", err.stack);
        res.status(code);
        res.send("Our app is sleeping");
    
    }
}



