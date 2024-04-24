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

// Class to Connect Server & Game
class Game_Session {
    game_api;
    room_code;
    started = false;
    restarting = false;
    done = false;
    current_player_index = 0;
    player_list = new Set();
    avaliable_avatar_ids = new Set(AVATAR_IDS);

    constructor(game) {
        this.game = game;
        this.set_game_api();
    }

    set_game_api() {
        // Selects Which Game API To Start
        if (this.game == Game_Types.Jeopardy) {
            this.game_api = new JeopardyAPI();
        }
    }

    // Initialization Functions

    init_session(active_roomcodes) {
        // Initializes The Game Session
        this.room_code = this.create_roomcode(active_roomcodes);
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

    // Player Functions

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
        // Returns Specified Player Based on ID
        for (const p of this.player_list) {
            if (p.id == id) {
                return p;
            }
        }
    }

    set_player_avatar(id, avatar_id) {
        // Sets the Avatar of the Player
        avatar_id = avatar_id.toLowerCase();
        if (!AVATAR_IDS.has(avatar_id)) {
            return 404;
        }
        let player = this.get_player(id);
        if (this.avaliable_avatar_ids.has(avatar_id)) {
            player.avatar_id = avatar_id;
            this.avaliable_avatar_ids.delete(avatar_id);
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

    // Game Functions

    start_game() {
        // Starts the Game
        this.started = true;
        this.restarting = false;
        this.player_order = this.get_random_player_order();
        return this.game_api.run_game();
        // return this.started;
    }

    restart(id) {
        // Setups Game Session for Another Round
        if (!this.restarting) {
            this.restarting = true;
            this.started = false;
            this.done = false;
            this.current_player_index = 0;
            this.set_game_api();
        }

        let curr_player = this.get_player(id);
        curr_player.points = 0;
    }

    end() {
        // Ends Game Session
        this.game_api.end_game();

        this.game = undefined;
        this.game_api = undefined;
        this.room_code = undefined;
        this.started = undefined;
        this.restarting = undefined;
        this.done = undefined;
        this.current_player_index = undefined;
        this.player_order = undefined;

        this.player_list = new Set();
        this.avaliable_avatar_ids = new Set(AVATAR_IDS);
    }

    get_random_player_order() {
        // Determines A Random Order for Players
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
        // Returns The Player Whose Turn it is Currently
        return this.player_order[this.current_player_index];
    }

    async check_response(id, answer) {
        // Checks Player Response
        let points = await this.game_api.check_answer(answer);
        let currentPlayer = this.get_current_turn_player();
        let updatedScore = currentPlayer.points + points;
        currentPlayer.points = updatedScore;

        if (this.game_api.game_done()) {
            this.game_api.end_game();
        } else {
            this.next_turn();
        }
    }

    remove_player_from_game(id) {
        // Removes Player From Game Session
        let curr_player = this.get_player(id);

        // Makes avatar avaliable again
        this.avaliable_avatar_ids.add(curr_player.avatar_id);

        // Deletes the Player From List & Order
        this.player_list.delete(curr_player);
        this.player_order.delete(curr_player);
    }

    game_session_done() {
        // Checks if the game has finished
        return this.game_api.game_done()
    }

    next_turn() {
        // Increments Player Turn
        this.current_player_index++;
        if (this.current_player_index == this.player_order.length) {
            this.current_player_index = 0;
        }

        if (this.game == Game_Types.Jeopardy) {
            setTimeout(() => {
                this.game_api.set_host_screen_to_board();
            }, 3000);
        }
    }

    // Host Functions

    host_screen_change() {
        // Returns What Host Screen Must Be Displaying Currently
        return this.game_api.current_host_screen();
    }

    get_session_leaderboard() {
        let leaderboard = Array.from(this.player_list);
        return leaderboard.sort(this.sort_players);
    }

    // Other Functions
    sort_players(a, b) {
        if (a.points > b.points) {
            return -1;
        } else if (a.points == b.points) {
            return 0;
        } else {
            return 1;
        }
    }
}

module.exports = Game_Session