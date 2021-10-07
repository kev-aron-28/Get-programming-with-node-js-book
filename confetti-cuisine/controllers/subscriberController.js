const Subscriber = require("../models/subscriber");

module.exports = {
    index: (req, res, next) => {
        Subscriber.find({})
            .then(users => {
                res.locals.subs = users;
                next();
            })
            .catch(error => {
                console.log(error);
                next(error);
            })
    },

    indexView: (req, res) => {
        if(req.query.format === "json"){
            res.json(res.locals.subs);
        } else {
            res.render("subscribers/index");
        }
    },

    create: (req, res, next) => {
        let params = {
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode,
        };

        Subscriber.create(params)
            .then(sub => {
                req.flash("success", `Subscribed`);
                res.locals.redirect = "/subscribers";
                res.locals.subs = sub;
                next();
            })
            .catch(error => {
                res.locals.redirect = "/subscribers/new";
                req.flash("error", `Failt to subscribe`);
                next();
            })
    },

    createView: (req, res) => {
        res.render("subscribers/newSub");
    },


    detail: (req, res, next) => {
        let subId = req.params.id;
        Subscriber.findById(subId)
            .then(sub => {
                res.locals.subDetail = sub;
                next();
            })
            .catch(e => {
                console.log(e);
                next(e);
            })
    },

    showDetail: (req, res) => {
        res.render("subscribers/detail");
    },

    edit: (req, res, next) => {
        let subId = req.params.id;
        Subscriber.findById(subId) 
            .then(sub => {
                res.render("subscribers/edit", {
                    sub: sub
                });
                next()
            })
            .catch(e => {
                next(e);
            });
    },

    update: (req, res, next) => {
        let subId = req.params.id;
        let paramsSub = {
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode,
        };
        Subscriber.findByIdAndUpdate(subId, {
            $set: paramsSub
        })
        .then(sub => {
            res.locals.redirect =  `/subscribers/${subId}`;
            res.locals.subDetail = sub;
            next();
        })
        .catch(e => {
            console.log(e);
            next(e);
        }) 
    },


    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },
};


