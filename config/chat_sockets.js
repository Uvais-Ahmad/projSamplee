module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.on('connection', (socket)=>{
        console.log("NEW connection received ",socket.id)

        //if client disconnect it tell us
        socket.on('disconnect',()=> {
            console.log("socket disconnected ...!");                                                                                     
        })
    })
}