const express = require('express');
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
    },
});
const dateFormat = require('dateformat');

app.set('port', (process.env.PORT || 3000));

app.use(express.static('dist'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

server.listen(app.get('port'), function() {
    console.log('Node app is running on port ', app.get('port'));
});

let messages = [];
let users = [];

io.on("connection", async (socket) => {
    socket.emit('init-chat', messages);
    socket.emit('update-users', users);

    socket.on('send-msg', function(data) {
        const newMessage = { id: 'msg_' + socket.id, text : data.message, user : data.user, date : dateFormat(new Date(), 'shortTime') };
        messages.push(newMessage);
        io.emit('read-msg', newMessage);
    });

    socket.on('add-user', function(user){
        users.push({ id: 'user_' + socket.id, name: user });
        io.emit('update-users', users);
    });

    socket.on('disconnect', function() {
        users = users.filter(function(user){
            return user.id !== socket.id;
        });
        io.emit('update-users', users);
    });
});