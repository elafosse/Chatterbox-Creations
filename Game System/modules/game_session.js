const PlayerMaker = require('./player');

// Starts Up Game
class Game_Session {
    room_code;
    player_names = new Set();
    player_id = {};

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

    add_player(name, id) {
        let uppercase_name = name.toUpperCase();
        if (!this.player_names.has(uppercase_name)) {
            // let player_id = Math.floor(Math.random() * 899) + 100;
            let player = new PlayerMaker(uppercase_name, id)
            this.player_names.add(player);
            return {
                STATUS: 200
            };
        } else {
            return {
                STATUS: 400
            };
        }
    }

    // get_game_player(name) {

    // }

    end_session() {
        // TODO: REMOVE ROOM_CODE
        // TODO: Disconnect Clients
    }
}

module.exports = Game_Session