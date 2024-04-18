const Message = require('./messages');
const Types = require('./message_types');

function random_roomcode() {
    return random_num(89999) + 10000;
}

function random_num(last) {
    return Math.floor(Math.random() * last);
}

function send_error(ws, status) {
    ws.send(JSON.stringify(new Message(Types.Error, {
        'STATUS': status
    })));
}

function send_success(ws, status) {
    ws.send(JSON.stringify(new Message(Types.Success, {
        'STATUS': status
    })));
}

exports.random_num = random_num;
exports.random_roomcode = random_roomcode;
exports.send_error = send_error;
exports.send_success = send_success;