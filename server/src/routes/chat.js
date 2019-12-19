// I need to require express in this file.
const express = require('express');
const mongoose = require('mongoose');

// I need to require any mongoose models that I will need to use when interfacing with db
const Chat = require('../models/Chat');

// I need to create a new express router
const router = new express.Router()

router.post('/addUser', async (req, res) => {
        console.log("This is the addUser post route in the server directory");
        // const chat = new Chat(req.body);
        // I need take the data off of the request object
        const username = req.body.name;
        console.log("This is the username of the user: ", username);
        const chatName = req.body.chatroom;
        console.log("This is the name of the chat: ", chatName);

    try {
            console.log("inside the try");
            // This is when the user name does not
            // exist in the database yet.

            // I want to try and write it to the database
                const chat = new Chat({username: username, chatRoomName: chatName});
                const tryToSave = await chat.save();

                if(tryToSave === 404) {
                    console.log("There was an error");
                }
                
                res.send(chat);
        
            // Handle error
            
        }
        catch(e){
            res.status(400).send(e);
        }
        // console.log("This is the incoming data for addUser: " + incoming);
        // I need to add to the db

        // handle errors/exceptions
    
    // Catch block
});

// app.get('/chat', async (req, res) => {
//     // I need to create a chat model
    

//     // then I need to create a collection of chats

    
//     // support the ability to create a chat


//     // given the id of a chat, if a user joins it, then I want to add them to the room.


// })

module.exports = router;