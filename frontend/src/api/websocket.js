class WebSocketService {

    static instance = null;
    callbacks = {};

    static getInstance(){
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    constructor() {
        this.socketRef = null;
    }

    connect(){
        const path = 'ws://127.0.0.1:8000/ws/chat/test/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {

        };
        this.socketRef.onmessage = () => {

        };
        this.socketRef.onerror = () => {

        };
        this.socketRef.onclose = () => {
            this.connect();
        };

    }

    socketNewMessage(data){
        const parseData = JSON.parse(data);
        const command = parseData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return
        }
        if (command === 'messages') {
            this.callbacks[command](parseData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](parseData.message)
        }
    }

    fetchMessages(username){
        this.sendMessage({commad: 'fetch_messages', username: username})
    }
    newChatMessage(message){
        this.sendMessage({commad: 'new_message', from: message.from, message: message.content})
    }
    addCallbaks(messagesCallback, newMessagesCallback){
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessagesCallback;
    }
    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify(...data))
        } catch (e) {
            console.log(e.message);
        }
    }
    state() {
        return this.socketRef.readyState;
    }
    waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function() {
                if (socket.readyState === 1) {
                    console.log('connection secure');
                    if(callback != null) {
                        callback()
                    }
                    return
                } else {
                    console.log('waiting for connection');
                    recursion(callback);
                }
            }, 10);
    }

}

 const WebSocketInstance = WebSocketService.getInstance()
 export default WebSocketInstance;
