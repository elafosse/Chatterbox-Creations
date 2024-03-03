const PlayerMaker = require('./player');
const Game_Types = require('../../Utils/game_types');
const JeopardyAPI = require('./jeopardy_api');
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
    game_api;
    started = false;
    done = false;
    room_code;
    current_player_index = 0;
    player_list = new Set();
    player_id = {};
    avaliable_avatar_ids = new Set(AVATAR_IDS);

    constructor(game) {
        this.game = game;
        this.set_game_api();
    }

    set_game_api() {
        if (this.game == Game_Types.Jeopardy) {
            this.game_api = new JeopardyAPI();
        }
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
        this.game_api.start_game();
    }
    
    *run_game() {
        // TODO: Start Game API
        // let index = 0;
        while (!this.done) {
            // 1. Player Chooses Category
            current_player = this.get_current_turn_player();
            yield current_player;
    
        }
    
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

    get_current_turn_player() {
        return this.player_order[this.current_player_index];
    }

    next_turn() {
        this.current_player_index++;
        if (this.current_player_index == this.player_order.length) {
            this.current_player_index = 0;
        }
    }

    host_screen_change() {
        return this.game_api.host_screen_change();
    }

    end_session() {
        // TODO: REMOVE ROOM_CODE
        // TODO: Disconnect Clients
    }
}

module.exports = Game_Session