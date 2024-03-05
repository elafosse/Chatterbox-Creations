# PLAYER SYSTEM API MESSAGES

## Joining A Game Session

#### Player ID

<p>This allows a Player to join a Game System</p>

- Parameters
    - *room_code*: (integer) Specifies which room the player is joining
    - *username*: (string) Specifies the name of the player

- Return Codes
    - **200**: Game Session entered successfully
    - **400**: Name not allowed
    - **404**: Game Session with Room Code not found

## Games

#### Jeopardy

