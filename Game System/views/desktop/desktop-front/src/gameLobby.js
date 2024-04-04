import React from 'react';
import './gameLobby.css'; 

const GameLobby = () => {
    const players = ['Joseph', 'Gabby', 'Jacob', 'Endrick', 'Maranda'];
  
    // This function positions players in a circle around the center
    const positionPlayers = (index, total) => {
      const angle = (index / total) * 360; // Angle for each player
      const distanceFromCenter = 250; 
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * distanceFromCenter;
      const y = Math.sin(radians) * distanceFromCenter;
      return {
        transform: `translate(${x}px, ${y}px)`,
        transformOrigin: `${50 + x}px ${50 + y}px`,
      };
    };
  
    return (
      <div className="game-lobby">
        <div className="title-gl">Jeopardy!</div>
        <div className="room-code">
          <div>Join at chatterbox.com</div>
          <div>Enter room code: 3653</div>
        </div>
        {players.map((player, index) => (
          <div className="player" key={index} style={positionPlayers(index, players.length)}>
            <div className="name">{player}</div>
          </div>
        ))}
      </div>
    );
  }
  
  export default GameLobby;