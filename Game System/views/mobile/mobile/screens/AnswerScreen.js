import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const AnswerScreen = ({ navigation }) => {
  const handlePressMicrophone = () => {
    // insert speech recognition/answer logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Turn!</Text>
      <Text style={styles.subtitle}>Tap the button to speak</Text>
      <TouchableOpacity style={styles.microphoneButton} onPress={handlePressMicrophone}>
        <Image
          source={require('../icons/microphone.png')}
          style={styles.microphoneIcon}
        />
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0C1562',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#0C1562',
  },
  microphoneButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0C1562',
    borderWidth: 2,
  },
  microphoneIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 57,
  },
});

export default AnswerScreen;
