exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
}

exports.respondNoSourceFound = (req, res) => {
    let CODE_ERROR = 404;
    res.status(CODE_ERROR);
    res.send(`${CODE_ERROR} | the page does not exist`);
}

exports.respondInternalError = (error, req, res, next) => {
    let CODE_ERROR = 500;
    res.status(CODE_ERROR);
    console.log(`Error ocurred ${error.stack}`)
    res.send(`${CODE_ERROR} | application is experiencing an error`);
}