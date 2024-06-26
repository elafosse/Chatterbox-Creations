const jepQuestions = require("./jeopardy");
const OpenAI = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


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
        });

        this.host_state = HOST_STATES.QUESTION;
    }

    async check_answer(player_ans) {
        // Checks Answer To See if it is Correct
        this.host_state = HOST_STATES.ANSWER;
        this.player_response = player_ans;

        // TODO: Fix 
        this.selected_cat = undefined;
        this.current_question = undefined;
        
        // TODO: Make Answer Check Better
        if (player_ans.toLowerCase() != this.current_question_answer.toLowerCase()) {
            let points = await this.ai_check(player_ans)
            return points;
        } else {
            let points = this.selected_amt
            this.selected_amt = undefined;
            return Number(points.replace("$",""))
        }
    }

    async ai_check(player_ans) {
        return new Promise((resolve, reject) => {
            console.log(player_ans);
            console.log(this.current_question_answer);
            openai.chat.completions.create({
                messages: [
                    {"role": "system", "content": "You are judging whether a jeopardy answer is correct or not, The words might not exactly correct, but if they sound the same, or are basically the same in different words answer yes. If the answer is None respond no. Dont allow broad terms for a specific answer. Answer correctly only with yes or no."},
                    {"role": "user", "content": "I have a jeopardy game that does not properly recognize answers people get due to sound recognition. If the answer is the same thing in different words, or if they sound the almost exactly the same, answer yes. If the player answer is too broad for the specific true answer, respond no. If the player answer is just a random word, such as womp, that does not sound the same as the true answer, respond no. Is the player answer of " + player_ans + " close enough to the true answer of" + this.current_question_answer + ", such that the meaning is the same if said out loud?"},
                ],
                model: "gpt-3.5-turbo",
            }).then((completion) => {
                let value = 0;
                console.log("running");
                console.log(completion.choices[0].message.content);
                if (completion.choices[0].message.content == "No." || completion.choices[0].message.content == "No"){
                    console.log("no entered");
                    // return 0;
                }else if(player_ans == "None"){

                } else {
                    console.log("in else")
                    let points = this.selected_amt;
                    console.log("points: " + points);
                    this.selected_amt = undefined;
                    let num = Number(points.replace("$",""));
                    console.log(num);
                    value = num;
                }
                resolve(value)
            })
        })

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
        this.selected_amt = amount;
        // this.selected_amt = "$" + amount + ".00";
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