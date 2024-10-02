import {Server as SocketIOServer} from 'socket.io'

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
       cors: {
           origin: process.env.ORIGIN,
           methods: ['GET', 'POST'],
           credentials: true
       } 
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`User disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if(userId){
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket id: ${socket.id}`);
        }else{
            console.log('User not found');
        }

        socket.on('disconnect', () => disconnect(socket));
    })
}


export default setupSocket