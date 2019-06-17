const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: "Username and room are required!"
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    })

    // Validate username
    if(existingUser) {
        return {
            error: "Username is in use!"
        }
    }

    // Store user
    const user = { id, username, room };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

addUser({
    id: 22,
    username: 'rob',
    room: 'nyc'
})

addUser({
    id: 62,
    username: 'mike',
    room: 'nyc'
})

addUser({
    id: 42,
    username: 'joe',
    room: 'farmingdale'
})

console.log(users);

const getUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users[index];
    } else {
        return {
            error: "Could not find that user"
        }
    }
}

console.log(getUser(42));

