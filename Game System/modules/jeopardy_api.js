const jepQuestions = require("./jeopardy");

const mapAvailable = new Map();
mapAvailable.set("MUSIC", ["$100.00", "$200.00","$300.00", "$400.00", "$500.00"]);
mapAvailable.set("ANIMALS", ["$100.00", "$200.00","$300.00", "$400.00", "$500.00"]);
mapAvailable.set("SPORTS", ["$100.00", "$200.00","$300.00", "$400.00", "$500.00"]);
mapAvailable.set("HISTORY", ["$100.00", "$200.00","$300.00", "$400.00", "$500.00"]);
mapAvailable.set("MOVIES", ["$100.00", "$200.00","$300.00", "$400.00", "$500.00"]);


const HOST_STATES = {
    NOT_STARTED: -1,
    BOARD: 0,
    QUESTION: 1,
    ANSWER: 2,
}

// Class For Running a Jeopardy Game
class Jeopardy {
    host_state = HOST_STATES.NOT_STARTED;
    current_question;
    current_question_answer;
    selected_cat;
    selected_amt;
    questionMap;

    // Game Progression Functions

    run_game() {
        // Starts Running The Jeopardy Game
        this.host_state = HOST_STATES.BOARD;
        return mapAvailable;
    }

    select_question() {
        // Selects The Question Based on Player Chosen Values
        jepQuestions.getDataTest(this.selected_cat, this.selected_amt).then((value)=>{
            // Sets Current Question & Its Answer
            this.current_question = value.Question;
            this.current_question_answer = value.Answer;

            // Removes From Map Board
            let arr = mapAvailable.get(this.selected_cat);
            const index = arr.indexOf(this.selected_amt);
            arr.splice(index, 1)
            mapAvailable.set(this.selected_cat, arr);

            // if (mapAvailable.get(this.selected_cat).length == 0) {
            //     mapAvailable.delete(this.selected_cat);
            // }
        });

        this.host_state = HOST_STATES.QUESTION;
    }

    check_answer(player_ans) {
        // Checks Answer To See if it is Correct
        this.host_state = HOST_STATES.ANSWER;
        this.player_response = player_ans;

        // TODO: Fix 
        this.selected_cat = undefined;
        this.current_question = undefined;
        
        // TODO: Make Answer Check Better
        if (player_ans.toLowerCase() != this.current_question_answer.toLowerCase()) {
            return 0;
        } else {
            let points = this.selected_amt
            this.selected_amt = undefined;
            return Number(points.replace("$",""))
        }
    }

    game_done() {
        // Checks if the Jeopardy Game Has Finished
        return (this.host_state == HOST_STATES.BOARD || this.host_state == HOST_STATES.ANSWER) && this.map_is_empty();
    }

    end_game() {
        // TODO: Complete

    }

    // Setters

    set_curr_category(category) {
        // Sets the Category Chosen By The Player
        if (mapAvailable.get(category.toUpperCase()).length != 0) {
            this.selected_cat = category.toUpperCase();
        }
    }
    
    set_curr_amount(amount) {
        // Sets The Amount Chosen By The Player
        this.selected_amt = "$" + amount + ".00";
        if (mapAvailable.get(this.selected_cat).includes(this.selected_amt)) {
            this.select_question();
        }
    }

    set_host_screen_to_board() {
        // Sets The Host Screen To The Jeopardy Board
        this.player_response = '';
        this.host_state = HOST_STATES.BOARD;
    }

    // Host Screen Functions

    current_host_screen() {
        // Returns Current Data To Display on Host Screen
        let data = {};
        switch (this.host_state) {
            case HOST_STATES.BOARD:
                data = {
                    Page: 'board',
                    Data: mapAvailable
                };
                break;
            case HOST_STATES.QUESTION:
                data = {
                    Page: 'question',
                    Data: this.current_question
                };
                break;
            case HOST_STATES.ANSWER:
                data = {
                    Page: 'correct_answer',
                    Data: {
                        Correct: this.current_question_answer,
                        Player: this.player_response
                    }
                };
                break;
        }

        return data;
    }

    // Other
    map_is_empty() {
        for (let value of mapAvailable.values()) {
            if (value.length != 0) {
                return false;
            }
        }

        return true;
    }

    avaliable_categories() {
        // Returns the Categories that are avaliable
        let arr = [];

        for (let [key, value] of mapAvailable) {
            if (value.length != 0) {
                arr.push(key);
            }
        }

        return arr;
    }

    avaliable_amounts_in_category() {
        // Returns the Amounts that are avaliable for the chosen category
        let arr = [];

        mapAvailable.get(this.selected_cat).forEach(function(amt) {
            arr.push(amt);
        });

        return arr;
    }

}

module.exports = Jeopardy;