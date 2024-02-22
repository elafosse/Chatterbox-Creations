// Starts Up Game
class Game_Session {
    room_code;
    player_names = new Set([]);

    constructor(game) {
        this.game = game;
    }

    start_session(active_roomcodes) {
        this.room_code = this.create_roomcode(active_roomcodes);
        console.log(this.room_code);
        // TODO: Frontend
        // TODO Run Trivia Code
        return this.room_code;
    }

    create_roomcode(active_roomcodes) {
        // Creates a code for players to join the room
        let roomcode = Math.floor(Math.random() * 89999) + 10000;
        if (active_roomcodes.has(roomcode)) {
            return this.create_roomcode();
        } else {
            return roomcode;
        }
    }

    add_player(name) {
        let uppercase_name = name.toUpperCase();
        if (!this.player_names.has(uppercase_name)) {
            this.player_names.add(uppercase_name);
            return 200;
        } else {
            return 400;
        }
    }

    end_session() {
        // TODO: REMOVE ROOM_CODE
        // TODO: Disconnect Clients
    }
}

module.exports = Game_Session