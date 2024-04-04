import React from 'react';
import LoadingScreen from './loadingScreen';
import GameLobby from './gameLobby';
// You can remove the import of './App.css' if you have removed the file or replaced it with your own styles.

function App() {
  // The state or routing logic will go here to determine whether to show LoadingScreen or GameLobby

  return (
    <div className="App">
      <LoadingScreen />
      <GameLobby />
      {/* Other components will go here as you build them */}
    </div>
  );
}

export default App;
