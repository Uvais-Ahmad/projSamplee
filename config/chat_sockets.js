module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.on('connection', (socket)=>{
        console.log("NEW connection received ",socket.id)

        //if client disconnect it tell us
        socket.on('disconnect',()=> {
            console.log("socket disconnected ...!");                                                                                     
        })

        //this data send by emit from client side
        socket.on('join_room',(data)=>{
            console.log("Joining request received of ",data.user_email);

            //it will join the existing chatroom if not exist otherwise it create chatroom then join
            socket.join(data.chatroom);
            //after Join fired an event to tell everyOne that someOne has joined the chat room .this will receive clientSide
            io.in(data.chatroom).emit('user_joined',data);
        });

        // CHANGE :: detect 'send_message' and from here broadcast to everyOne in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        })
    })
}