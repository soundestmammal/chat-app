
const express = require('express');
const User = require('../models/User');


const router = new express.Router();

router.get('/fetchUsers', async (req, res) => {
    console.log("This is the fetchUsers in the node applicaton");
    // res.send({ age: "This is the valid age!!!"});
    // try {
    //     // query the database for the user with name of rob
    //     const theUser = await User.findOne("rob");

    //     console.log(theUser);
    //     // If there was no user, then we want to throw an error.
    //     if(0 === theUser) {
    //         console.log("Log this error");
    //         throw new Error();
    //     }
    //     console.log(theUser);
    //     res.send(theUser);
    // } catch(e) {
    //     res.status(404).send();
    // }
    res.send({message: "Hi there!!!"})
});

// Let's put some routes down here...
// app.get('/fetchUsers', async (req, res) => {
//     console.log("This is the fetchUsers in the node applicaiton");
//     try {
//         const user = await User.find({name: "rob"});
//         if(!user) {
//             throw new Error();
//         }
//         console.log("This is what I want: " + user.age);
//         res.send({age: user.age});
//     } catch(e) {
//         res.status(404).send();
//     }
// })

module.exports = router;