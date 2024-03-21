import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AvatarSelectionScreen = ({ navigation }) => {
  // Placeholder for avatar selection logic
  const [selectedAvatar, setSelectedAvatar] = React.useState(null);

  // Placeholder avatars data
  const avatars = [
    { id: 'avatar1' },
    { id: 'avatar2' },
    { id: 'avatar3' },
    { id: 'avatar4' },
    // Add more placeholders as needed
  ];

  // Placeholder function for the READY button
  const handleReady = () => {
    if (selectedAvatar) {
      // Navigate to the next screen or perform the next action
      // navigation.navigate('NextScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick your avatar</Text>
      
      {/* Avatar selection area */}
      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatar,
              selectedAvatar === avatar.id && styles.selectedAvatar
            ]}
            onPress={() => setSelectedAvatar(avatar.id)}
          >
            {/* Instead of an image, we just display a gray box */}
          </TouchableOpacity>
        ))}
      </View>

      {/* READY button */}
      <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
        <Text style={styles.readyButtonText}>READY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // Add additional styling for your avatar container
  },
  avatar: {
    width: 170,
    height: 170,
    backgroundColor: '#cccccc', // Gray color
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    // Add additional styling as needed
  },
  selectedAvatar: {
    borderColor: 'blue', // Or your highlight color
    borderWidth: 2,
    // Add additional styling for selected state
  },
  readyButton: {
    marginTop: 20,
    backgroundColor: '#0000ff',
    borderRadius: 25,
    alignItems: 'center',
    padding: 15,
    width: 200,
    // Add additional styling as needed
  },
  readyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    // Add additional styling as needed
  },
  // Add additional styles for your avatars
});

export default AvatarSelectionScreen;
