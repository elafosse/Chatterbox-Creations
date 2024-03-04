HOST_STATES = {
    NOT_STARTED: -1,
    BOARD: 0,
    QUESTION: 1,
    ANSWER: 2,
}

// Class For Running a Jeopardy Game
class Jeopardy {
    host_state = HOST_STATES.NOT_STARTED;
    show_board = true;
    // TODO: change
    current_question = 'How many stars are on the American Flag?';
    current_answer = '50';
    selected_cat;
    selected_amt;

    // Game Progression Functions

    run_game() {
        // Starts Running The Jeopardy Game
        // TODO: Get Questions from CSV
        this.host_state = HOST_STATES.BOARD;
    }

    // Setters

    set_curr_category(category) {
        this.selected_cat = category;
    }

    set_curr_amount(amount) {
        this.selected_amt = amount;
        this.select_question();
    }

    select_question() {
        // TODO: Use Jeopardy Data
        this.host_state = HOST_STATES.QUESTION;
    }

    change_screen() {

    }

    // Host Screen Functions

    current_host_screen() {
        // Returns Current Data To Display on Host Screen
        // TODO: Add Leaderboard state? Return Current Board
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
                    Page: 'answer',
                    Data: this.current_answer
                };
                break;
        }

        return data;
    }

    check_answer(player_ans) {
        this.host_state = ANSWER;
        if (player_ans != this.current_answer) {
            return 0;
        } else {
            return this.selected_amt;
        }
    }
}

module.exports = Jeopardy;