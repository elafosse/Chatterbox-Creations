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

function name_appropriate(name) {
    // TODO: Check if name is appropriate somehow
    return true;
}

exports.random_num = random_num;
exports.random_roomcode = random_roomcode;
exports.send_error = send_error;
exports.send_success = send_success;
exports.name_appropriate = name_appropriate;