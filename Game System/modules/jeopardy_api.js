const jepQuestions = require("./jeopardy");

const amountArr = ["$100.00", "$200.00","$300.00", "$400.00", "$500.00"];

mapAvailable = new Map();
    mapAvailable.set("MUSIC", amountArr);
    mapAvailable.set("ANIMALS", amountArr);
    mapAvailable.set("SPORTS", amountArr);
    mapAvailable.set("HISTORY", amountArr);
    mapAvailable.set("MOVIES", amountArr);


HOST_STATES = {
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
        // TODO: Get Questions from CSV
        this.host_state = HOST_STATES.BOARD;
    }

    select_question() {
        // Selects The Question Based on Player Chosen Values
        jepQuestions.getDataTest(this.selected_cat, this.selected_amt).then((value)=>{
            console.log(value.Question)
            console.log(value.Answer)
            this.current_question = value.Question;
            this.current_question_answer = value.Answer;
            amountArr = mapAvailable.get(this.selected_cat);
            const index = amountArr.indexOf(this.selected_amt);
            mapAvailable.set(this.selected_cat, amountArr.splice(index, 1));

        });;

        this.host_state = HOST_STATES.QUESTION;
    }

    check_answer(player_ans) {
        // Checks Answer To See if it is Correct
        this.host_state = HOST_STATES.ANSWER;
        this.player_response = player_ans;
        if (player_ans != this.current_question_answer) {
            return 0;
        } else {
            return this.selected_amt;
        }
    }

    check_if_game_done() {
        // Checks if the Jeopardy Game Has Finished
        // TODO: Complete Check
        this.end_game();
    }

    end_game() {
        // TODO: Complete

    }

    // Setters

    set_curr_category(category) {
        // Sets the Category Chosen By The Player
        // TODO: Check if Category Can be chosen
        this.selected_cat = category;
    }
    
    set_curr_amount(amount) {
        // Sets The Amount Chosen By The Player
        // TODO: Check if amount Can be chosen
        this.selected_amt = amount;
        this.select_question();
    }

    set_host_screen_to_board() {
        // Sets The Host Screen To The Jeopardy Board
        this.player_response = '';
        this.host_state = HOST_STATES.BOARD;
    }

    // Host Screen Functions

    current_host_screen() {
        // Returns Current Data To Display on Host Screen
        // TODO: Return Current Board
        let data = {};
        switch (this.host_state) {
            case HOST_STATES.BOARD:
                data = {
                    Page: 'board',
                    Data: ''
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

}

module.exports = Jeopardy;