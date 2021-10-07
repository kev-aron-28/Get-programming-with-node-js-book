const Subscriber = require("./subscriber");
const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
    {Schema} = mongoose,
    userSchema = new Schema({
        name:{
            first:{
                type:String,
                trim: true
            },
            last:{
                type:String, 
                trim:true
            }
        },

        email:{
            type:String,
            required:true,
            lowercase: true,
            unique: true
        },
        
        apiToken: {
            type: String
        },
        

        zipCode:{
            type:Number,
            min:[1000, "Zip too short"],
            max: 99999  
        },

        // password:{
        //     type: String,
        //     required: true
        // },
        courses:[{type: Schema.Types.ObjectId, ref:"Course"}],
        subscribedAccount:{type: Schema.Types.ObjectId, ref:"Subscriber"},
    });


    userSchema.plugin(passportLocalMongoose, {
        usernameField: "email"
    });

    userSchema.virtual("fullName")
        .get(function(){
            return `${this.name.first} ${this.name.last}`;
        })


    userSchema.pre("save", function(next) {
        let user = this;
        if(user.subscribedAccount === undefined){
            Subscriber.findOne({
                email: user.email
            })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(e => {
                console.log(`Error connecting with subscriber : ${error.message}`);
                next(e);
            }) 
        } else {
            next();
        }
    }); 

    userSchema.pre("save", function(next){
        let user = this;
        if(!user.apiToken) user.apiToken = randToken.generate(16);
        next();
    })

    

    // userSchema.pre("save", function(next) {
    //     let user = this;

    //     bcrypt.hash(user.password, 10).then(hash => {
    //         user.password = hash;
    //         next();
    //     })
    //     .catch(error => {
    //         console.log("Error hashing password");
    //         next(error);
    //     })
    // });

    // userSchema.methods.passwordComparison = function(inputPassword) {
    //     let user = this;
    //     return bcrypt.compare(inputPassword, user.password);
    // };

    
    module.exports = mongoose.model("User", userSchema);
    
    