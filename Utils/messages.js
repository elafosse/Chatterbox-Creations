// Class for Messages sent between Players and Game Server

class Message {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    import_data(msg) {
        this.type = msg.type;
        this.data = msg.data;
        return this;
    }
}

module.exports = Message