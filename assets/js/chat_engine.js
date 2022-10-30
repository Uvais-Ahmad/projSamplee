// This class used to request of  create the connection
class chatEngine {
    constructor(chatBoxId , userEmail ,userName){
        this.chatBox = $(`#${chatBoxId}`);  
        this.userEmail = userEmail;
        this.userName = userName;
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

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){

            let msg = $('#chat-message-input').val();
            $('#chat-message-input').val("")
            if( msg != ''){
                //then fire an event and alogside send some data
                self.socket.emit("send_message", {
                    message : msg,
                    user_email : self.userEmail,
                    user_name : self.userName,
                    chatroom : 'codeial'
                })
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('received messsage ',data.message);

            let newMessage = $('<li></li>');
            let messageType = 'other-messages';

            if(data.user_email == self.userEmail){
                messageType = 'self-messages';
            }

            // newMessage.append($('<span>',{
            //     'html' : data.message
            // }));
            newMessage.append($('<span></span>').text(data.message))
            // newMessage.append($('<sub></sub>').text(data.user_name));
            
            // newMessage.append($('<sub>',{
            //     'html' : data.user_email
            // }));

            newMessage.addClass('msg');
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        })
    }
}