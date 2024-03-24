import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HostStartScreen = ({ navigation }) => {

  const handleStartGame = () => {
    // Logic to start the game
    navigation.navigate('CatagorySelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Is everybody in?</Text>
      <Text style={styles.subtitle}>Press the button to begin the game.</Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0C1562', 
  },
  subtitle: {
    fontSize: 16,
    color: '#0C1562', 
    marginBottom: 20, 
  },
  startButton: {
    backgroundColor: '#0C1562', 
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HostStartScreen;
