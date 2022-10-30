// This class used to request of  create the connection
class chatEngine {
    constructor(chatBoxId , userEmail ){
        this.chatBox = $(`#${chatBoxId}`);  
        this.userEmail = userEmail;

        //{ transports : ['websocket'] } used to avoid error for Not Allowed to server for talking server
        this.socket = io.connect('http://localhost:3000', { transports : ['websocket'] });// to req a conn

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){

        let self = this;

        this.socket.on( 'connect' ,function(){
            console.log('connection established using sockets...!')

            // Here we fired an event using emit(); and send some data alongside ruquest
            self.socket.emit("join_room",{
                user_email : self.userEmail,
                chatroom : 'codeial'
            })

            //fired event from erver received by the client side
            self.socket.on('user_joined',(data)=>{
                console.log("User joined ",data);
            });
        });
    }
}