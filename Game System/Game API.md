# GAME SYSTEM API MESSAGES

## Joining A Game Session

#### Join Game

<p>This allows a Player to join a Game System</p>

- Parameters
    - *room_code*: (integer) Specifies which room the player is joining
    - *username*: (string) Specifies the name of the player

- Return Codes
    - **200**: Game Session entered successfully
    - **400**: Name not allowed
    - **404**: Game Session with Room Code not found
    - **406**: No more players allowed for game session

#### Select An Avatar

<p>This allows a Player to select their own avatar</p>

- Parameters
    - *avatar_id*: (integer) Specifies which avatar the player is selecting

- Return Codes
    - **200**: Avatar Selected Successfully
    - **400**: Avatar Selected by another player


## Games

### Jeopardy

#### Select Category

<p>Allows a Player to select the Jeopardy Category</p>

- Parameters
    - *category*: (string) Specifies which category the player is selecting

- Return Codes
    - **200**: Category Selected Successfully
    - **400**: All questions already answered in category


#### Select Question

<p>Allows a Player to select the question within the Category</p>

- Parameters
    - *amount*: (int) Specifies which question the player is selecting

- Return Codes
    - **200**: Question Selected Successfully
    - **400**: Question already selected

#### Answer Question

<p>Allows a Player to answer the question they selected</p>

- Parameters
    - *answer*: (string) Specifies the answer the player gives to the question selected

- Return Codes
    - **200**: Answer Sent Successfully