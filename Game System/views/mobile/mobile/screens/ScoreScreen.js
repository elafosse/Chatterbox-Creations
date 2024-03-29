import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ScoreScreen = ({ navigation }) => {
  // Placeholder data - you would replace this with actual game state
  const players = [
    { id: 'player1', score: 100 },
    { id: 'player2', score: 200 },
    { id: 'player3', score: 300 },
    { id: 'player4', score: 400 },
    { id: 'player5', score: 100 },
    { id: 'player6', score: 200 },
    { id: 'player7', score: 300 },
    { id: 'player8', score: 400 },
  ];

  // Function to render a single player item
  const renderPlayer = (player) => (
    <View key={player.id} style={styles.playerContainer}>
      <View style={styles.avatar} />
      <Text style={styles.score}>{`$${player.score}`}</Text>
    </View>
  );

  // Function to render players in grid layout
  const renderPlayersGrid = () => {
    let playerRows = [];
    for (let i = 0; i < players.length; i += 2) {
      const player1 = players[i];
      const player2 = players[i + 1];
      playerRows.push(
        <View key={`row-${i}`} style={styles.row}>
          {renderPlayer(player1)}
          {player2 ? renderPlayer(player2) : <View style={styles.playerContainer} />}
        </View>
      );
    }
    return playerRows;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Scores</Text>
      {players.length > 4 ? renderPlayersGrid() : players.map(renderPlayer)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0C1562',
    alignSelf: 'center',
    marginBottom: 20,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  avatar: {
    width: 50, // Set the width of your avatar
    height: 50, // Set the height of your avatar
    borderRadius: 25, // Half the width/height to make it circular
    backgroundColor: '#cccccc', // Your desired gray color
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0C1562',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScoreScreen;