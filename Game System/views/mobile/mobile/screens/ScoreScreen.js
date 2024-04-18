import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ScoreScreen = ({ navigation }) => {
  const players = [
    { id: 'player1', score: 100 },
    { id: 'player2', score: 200 },
    { id: 'player3', score: 300 },
    { id: 'player4', score: 400 },
    { id: 'player5', score: 100 },
    { id: 'player6', score: 200 },
    { id: 'player7', score: 300 },
  ];

  const renderPlayer = (player, isGridLayout = true) => (
    <View key={player.id} style={[styles.playerContainer, !isGridLayout && styles.playerContainerCentered]}>
      <View style={styles.avatar} />
      <Text style={styles.score}>{`$${player.score}`}</Text>
    </View>
  );

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
    <ScrollView contentContainerStyle={players.length <= 4 ? styles.centeredContent : {}} style={styles.container}>
      <Text style={styles.title}>Scores</Text>
      {players.length > 4 ? renderPlayersGrid() : players.map(player => renderPlayer(player, false))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  playerContainerCentered: {
    minWidth: '50%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#cccccc',
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
