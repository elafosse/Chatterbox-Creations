HOST_STATES = {
    NOT_STARTED: -1,
    BOARD: 0,
    QUESTION: 1,
    ANSWER: 2,
}

class Jeopardy {
    host_state = HOST_STATES.NOT_STARTED;
    show_board = true;
    // TODO: change
    current_question = 'How many stars are on the American Flag?';
    current_answer = '50';
    selected_cat;
    selected_amt;

    constructor() {
        
    }

    start_game() {
        // TODO: Get Questions from CSV
        this.host_state = HOST_STATES.BOARD;
    }

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

    host_screen_change() {
        // TODO: Complete
        let data = {};
        switch (this.host_state) {
            case HOST_STATES.BOARD:
                data = {
                    Page: 'board',
                    Data: ''
                }
                break;
            case HOST_STATES.QUESTION:
                data = {
                    Page: 'question',
                    Data: this.current_question
                }
                break;
            case HOST_STATES.ANSWER:
                data = {
                    Page: 'answer',
                    Data: this.current_answer
                }
                break;
        }

        return data;
    }
}

module.exports = Jeopardy;