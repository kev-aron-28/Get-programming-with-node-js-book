const User = require("../models/user");
const passport = require("passport");
const httpStatus = require("http-status-codes");
const token = process.env.TOKEN || "recipeT0k3n";
const jsonWebToken = require("jsonwebtoken");

const getUserParams = (body) => {
    return {
        name: {
            first: body.first,
            last: body.lastName
        },
        email: body.mail,
        password: body.password,
        zipCode: body.zipCode
    }
}
 
module.exports = {
    // authenticate: (req, res, next) => {
    //     User.findOne({
    //         email: req.body.email
    //     })
    //     .then(user => {
    //         if(user){
    //             user.passwordComparison(req.body.password)
    //                 .then(passwordsMatch => {
    //                     if(passwordsMatch){
    //                         res.locals.redirect = `/users/${user._id}`;
    //                         req.flash("success", `logged in successfully`);
    //                         res.locals.userPage = user;
    //                     } else {
    //                         req.flash("error", "Your account or password is incorrect");
    //                         res.locals.redirect = "/users/login";
    //                     }
    //                     next()
    //                 });
    //         } else {
    //             req.flash("error", "Your account or password is incorrect");
    //             res.locals.redirect = "/users/login";
    //             next();
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         next(error);
    //     })
    // },
    
    
    
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                // res.render("users/index", {
                //     users:users
                // })
                res.locals.user = users;
                next();
            })
            .catch(e => {
                console.log(e);
                next(e);
            }) 
    },

    indexView:(req, res) => {
        if(req.query.format === "json"){
            res.json(res.locals.user);
        } else {
            res.render("users/index");
        }
    },

    create:(req, res, next) => {

        let newUser = new User(getUserParams(req.body));


        User.register(newUser, req.body.password, (error, user) => {
            if(user){
                req.flash("success", `${user.fullName}'s account created `);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            } else {
                res.locals.redirect = "/users/new";
                req.flash("error", `Failed to create user account because ${error.message}`);
                next();
            }
        })

    },

    new: (req, res) => {
        res.render("users/new");
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.userPage = user;
                next();
            })
            .catch(e => {
                console.log("Error fetching user", e);
                next(e);
            })
    },

    showView: (req, res) => {
            res.render("users/show");
        
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(userEdit => {
                res.render("users/edit", {
                    user: userEdit
                });
            })
            .catch(error => {
                console.log(`An error ocurred fetching data ${error}`);
                next(error);
            })
    },

    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
        .then(user => {
            res.locals.redirect = `/users/${userId}`;
            res.locals.userPage = user;
            next();
        })
        .catch(error => {
            console.log(`An error ocurred fetching data ${error}`);
            next(error);
        })
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(error);
                next(error);
            })
    },


    login: (req, res) => {
        res.render("users/login");
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login",
        successRedirect: "/users",
        successFlash: "Logged in"
    }),

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out");
        res.locals.redirect = "/users";
        next();
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },

    verifyToken: (req, res, next) => {
        let token = req.query.apiToken;
        if(token){
            User.findOne({apiToken: token})
                .then(user => {
                    if(user) next();
                    else next(new Error("Invalid API token"));
                })
                .catch(e=> {
                    next(new Error(e.message));
                })
        } else {
            next(new Error("Invalid API token"));
        }
    },

    apiAuthenticate: (req, res, next) => {
        passport.authenticate("local", (errors, user) => {
            if(user){
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({ 
                    success: true,
                    token: signedToken,
                });
            } else {
                res.json({
                    success: false,
                    message: "Could not authenticate user0"
                }); 
            }
        })(req, res, next);
    },

    verifyJWT: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
          jsonWebToken.verify(token, "secret_encoding_passphrase", (errors, payload) => {
            if (payload) {
              User.findById(payload.data).then(user => {
                if (user) {
                  next();
                } else {
                  res.status(httpStatus.FORBIDDEN).json({
                    error: true,
                    message: "No User account found."
                  });
                }
              });
            } else {
              res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Cannot verify API token."
              });
              next();
            }
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            error: true,
            message: "Provide Token"
          });
        }
      }

    
};