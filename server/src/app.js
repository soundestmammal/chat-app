const express = require('express');
const path = require('path');
const cors = require('cors');
// const bodyParser = require('body-parser');
const PORT = 5000;
const app = express();

// Invoke the code that is written for the user model
require('./db/mongoose');
require('./models/User');
require('./models/Chat');
require('./utils/users');

// Import all routers
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');

app.use(cors());
app.use(express.json());
//app.use(bodyParser);
app.use(userRouter);
app.use(chatRouter);

// Use express.static middleware
// https://expressjs.com/en/api.html#express.static
// app.use(express.static(`${__dirname}/../client/build`));

// For all routes, I don't want to render anything from the server
// I want to always render my react application.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}`);
});