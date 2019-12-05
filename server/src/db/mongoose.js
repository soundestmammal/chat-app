const mongoose = require('mongoose');

const keys = require('../config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log("SUCCESSFULLY CONNECTED TO THE DATABASE"))
    .catch(e => console.log("There was an error in connecting to the database"));

const db = mongoose.connection;

if(!db) {
    console.log("Error connecting db");
} else {
    console.log("Successfully connected to the database");
}