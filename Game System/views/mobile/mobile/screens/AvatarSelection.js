import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AvatarSelection = ({ navigation }) => {
  // Placeholder for avatar selection logic
  const [selectedAvatar, setSelectedAvatar] = React.useState(null);

  //TODO: Determine whether user is the host or not
  const isHost = true;

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
      // Check if the user is the host and navigate accordingly
      if (isHost) {
        navigation.navigate('HostStartScreen');
      } else {
        navigation.navigate('WaitScreen');
      }
    } else {
      // alert the user to select an avatar
      alert('Please select an avatar.');
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
    color: '#0C1562',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    width: 170,
    height: 170,
    backgroundColor: '#cccccc', // Gray color
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    
  },
  selectedAvatar: {
    borderColor: '#0C1562',
    borderWidth: 2,
  },
  readyButton: {
    marginTop: 20,
    backgroundColor: '#0C1562',
    borderRadius: 25,
    alignItems: 'center',
    padding: 15,
    width: 200,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
  },
  readyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AvatarSelection;
