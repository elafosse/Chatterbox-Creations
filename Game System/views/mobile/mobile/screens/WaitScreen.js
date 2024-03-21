import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaitScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeopardy!</Text>
      <Text style={styles.subtitle}>Please wait for the game to begin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set the background color to white
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'orange', // This is an assumption, set the color you need
    marginBottom: 20, // Adjust the space as per your design
  },
  subtitle: {
    fontSize: 18,
    color: '#333', // This is an assumption, set the color you need
    // Add additional styling as needed
  },
  // Add other styles if needed
});

export default WaitScreen;