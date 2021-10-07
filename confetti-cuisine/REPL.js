const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");
// const User = require("./models/user");
let testSubscriber, testCourse;

mongoose.connect(
    "mongodb://localhost:27017/node_book",
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }
)

mongoose.Promise = global.Promise;


// User.create({
//     name:{
//         first: "Israel",
//         last: "Mengue"
//     },
//     email: "isra@hotmail.com",
//     password: "isra123"
// })
// .catch(e => {
//     console.log(e);
// }); 

Subscriber.create({
    name:"Israel",
    email: "isra@hotmail.com",
    zipCode: 10016
})
.then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Subscriber created ${subscriber.getInfo()}`)
})
.then(() => {
    return Course.create({
        title:"Node basics",
        description: "Learn basics",
        zipCode: 10016,
        items: ["Book", "Computer"]
    })
})
.then((course) => {
    testCourse = course;
    console.log(`Course created ${course.title}`);
})
.then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
})
.catch(e => {
    console.log(e);
}) 


// .then(() => {
//     return Subscriber.populate(testSubscriber, "courses");
// })
// .then((subcriber) => {
//     console.log(subcriber);
// })
// .catch(e => {
//     console.log(e);
// }) 
