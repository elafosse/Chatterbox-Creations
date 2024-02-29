const PlayerMaker = require('./player');
const Utils = require('../../Utils/utils');
const AVATAR_IDS = new Set([
    'elephant',
    'frog',
    'duck',
    'cow',
    'chicken',
    'penguin',
    'dog',
    'panda',
])

// Starts Up Game
class Game_Session {
    started = false;
    room_code;
    current_player_index = 0;
    player_list = new Set();
    player_id = {};
    avaliable_avatar_ids = new Set(AVATAR_IDS);

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
        // TODO: Test
        // let roomcode = Math.floor(Math.random() * 89999) + 10000;
        let roomcode = Utils.random_roomcode();
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

    get_player(id) {
        for (const p of this.player_list) {
            if (p.id == id) {
                return p;
            }
        }
    }

    set_player_avatar(id, avatar_id) {
        if (!AVATAR_IDS.has(avatar_id)) {
            return 400;
        }
        let player = this.get_player(id);
        if (this.avaliable_avatar_ids.has(avatar_id)) {
            player.avatar_id = avatar_id;
            this.avaliable_avatar_ids.delete(avatar_id)
            return 200;
        } else {
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

    start_game() {
        this.started = true;
        this.player_order = this.get_player_order();
        
        // TODO: Start Game API

        // 1. Player Chooses Category
        // 2. Player Chooses Amount
        // 3. Jeopardy API Returns Question
        // 4. 

    }

    get_player_order() {
        let array = Array.from(this.player_list);
        let current_index = array.length;
        let random_index;

        while (current_index > 0) {
            random_index = Math.floor(Math.random() * current_index);
            current_index--;
            [array[current_index], array[random_index]] = [array[random_index], array[current_index]];
        }

        return array;
    }

    end_session() {
        // TODO: REMOVE ROOM_CODE
        // TODO: Disconnect Clients
    }
}

module.exports = Game_Session