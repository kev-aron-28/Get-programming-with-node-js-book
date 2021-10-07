const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

mongoose.connect(
    "mongodb://localhost:27017/node_book",
    {userNewUrlParser: true}
);

mongoose.connection;

let contacts = [ 
    {
        name:"Kevin Tapia",
        email: "kev_tapia@hotmail.com",
        zipCode: 10016
    },
    {
        name:"Gloria ",
        email: "glo_ta@hotmail.com",
        zipCode: 50063
    },
    {
        name:"Adonai Paniagua",
        email: "ado_@hotmail.com",
        zipCode: 10016
    }
]

Subscriber.deleteMany()
    .exec()
    .then(() => {
        console.log("Subscriber data is empty");
    });

let commands = [];

contacts.forEach((e) =>{
    commands.push(Subscriber.create({
        name:e.name,
        email: e.email,
        zipCode: e.zipCode
    }));
});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(e => {
        console.log(e);
    })

