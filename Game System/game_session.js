// Starts Up Game
class Game_Session {
    room_code;

    constructor(game) {
        this.game = game;
    }

    start_session() {
        this.room_code = this.create_roomcode();
        console.log(this.room_code);
        return this.room_code;
        // TODO: Frontend
    }

    create_roomcode() {
        // Creates a code for players to join the room
        var roomcode = Math.floor(Math.random() * 89999) + 10000;
        if (ACTIVE_ROOMCODES.has(roomcode)) {
            return this.create_roomcode();
        } else {
            ACTIVE_ROOMCODES.add(roomcode);
            return roomcode;
        }
    }

    end_session() {
        // TODO: REMOVE ROOM_CODE
        // TODO: Disconnect Clients
    }
}

module.exports = Game_Session