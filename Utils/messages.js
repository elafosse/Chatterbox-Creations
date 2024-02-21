// Class for Messages sent between Players and Game Server

class Message {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    import_data(msg) {
        var data = JSON.parse(msg);
        this.type = data.type;
        this.data = data.data;
        return this;
    }
}

module.exports = Message