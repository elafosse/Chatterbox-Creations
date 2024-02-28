const PlayerMaker = require('./player');

// Starts Up Game
class Game_Session {
    room_code;
    player_list = new Set();
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
        // Adds Player To Game Session
        if (this.player_list >= 8) {
            // Returns if too many players attempt to join
            return 406;
        } else if (!this.player_name_in_game(name.toUpperCase())) {
            this.player_list.add(new PlayerMaker(name.toUpperCase(), id));
            return 200;
        } else {
            // Name Already Taken
            return 400;
        }
    }

    player_name_in_game(name) {
        // Checks if Player Name is Already In the Game
        for (const p of this.player_list) {
            if (p.name == name) {
                return true;
            }
        }

        return false;
    }

    end_session() {
        // TODO: REMOVE ROOM_CODE
        // TODO: Disconnect Clients
    }
}

module.exports = Game_Session