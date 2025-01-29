import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);
    socket.broadcast.emit('greeting','Hi');
    socket.on("user-message", (message) => {
        console.log(`Message sent by user: ${message}`);
        io.emit("message", message);
    })
    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
})


app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
})

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
})