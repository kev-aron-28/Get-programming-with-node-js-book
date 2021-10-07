exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`Page for ${veg}`);
}


exports.userSignUpProcessor = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("Sign up correctly");
}

exports.name = (req, res) => {
    let param = req.params.myname;
    res.render("index", {name : param});
}